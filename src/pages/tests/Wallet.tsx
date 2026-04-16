import NavBar from "@/components/NavBar";
import { baseUrl } from "@/config/api";
import { useAppContext } from "@/contexts/AppContext";
import { authHeaders } from "@/utils/Functions";
import { useState, useEffect } from "react";

type Transaction = {
  id: number;
  type: "deposit" | "withdrawal" | "payment" | "reward";
  amount: string;
  status: "completed" | "pending" | "failed";
  description: string;
  timestamp: string;
};

interface PayoutMethod {
  id: number;
  provider: string;
  phone_number: string;
  account_name: string;
  created_at: string;
  updated_at: string;
}

const WalletPage = () => {
  const { user } = useAppContext();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isAddPayoutOpen, setIsAddPayoutOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [payoutMethod, setPayoutMethod] = useState<PayoutMethod | null>(null);
  const [provider, setProvider] = useState("MTN");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [payoutLoading, setPayoutLoading] = useState(false);

  useEffect(() => {
    fetchWalletData();
    fetchTransactions();
  }, []);

  useEffect(() => {
    getPayoutMethod();
  }, []);

  console.log("transactions", transactions);

  const getPayoutMethod = async () => {
    try {
      const response = await fetch(`${baseUrl}/payout-method`, {
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPayoutMethod(data);
      }
    } catch (error) {
      console.error("Failed to fetch payout method:", error);
    }
  };

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/wallet`, {
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBalance(parseFloat(data.balance));
      }
    } catch (error) {
      console.error("Failed to fetch wallet data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${baseUrl}/wallet/transactions`, {
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  const handleAddPayoutMethod = async () => {
    if (!phoneNumber || !accountName) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setPayoutLoading(true);
      const response = await fetch(`${baseUrl}/payout-method`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({
          provider,
          account_number: phoneNumber,
          account_name: accountName,
        }),
      });

      if (response.ok) {
        alert("Payout method added successfully!");
        setPhoneNumber("");
        setAccountName("");
        setProvider("MTN");
        setIsAddPayoutOpen(false);
        getPayoutMethod();
      } else {
        alert("Failed to add payout method. Please try again.");
      }
    } catch (error) {
      console.error("Error adding payout method:", error);
      alert("An error occurred while adding payout method");
    } finally {
      setPayoutLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/wallet/withdrawal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({ amount: parseFloat(withdrawAmount) }),
      });

      if (response.ok) {
        alert("Withdrawal request submitted successfully!");
        setWithdrawAmount("");
        setIsWithdrawOpen(false);
        fetchWalletData();
      } else {
        alert("Withdrawal failed. Please try again.");
      }
    } catch (error) {
      console.error("Withdrawal error:", error);
      alert("An error occurred during withdrawal");
    } finally {
      setLoading(false);
    }
  };

  console.log("Balance:", balance);

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/wallet/deposit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({ amount: parseFloat(depositAmount) }),
      });

     // console.log('response', response);
      const responseBody = await response.json();
      console.log('response body', responseBody);
      if (response.ok) {
    
      
        window.location.href = responseBody.authorization_url;

        //alert("Deposit initiated successfully!");
        setDepositAmount("");
        setIsDepositOpen(false);
        fetchWalletData();
      } else {
        alert("Deposit failed. Please try again.");
      }
    } catch (error) {
      console.error("Deposit error:", error);
      alert("An error occurred during deposit");
    } finally {
      setLoading(false);
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return "💳";
      case "withdrawal":
        return "🏦";
      case "payment":
        return "💰";
      case "reward":
        return "🎁";
      default:
        return "📊";
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "deposit":
        return "bg-green-600";
      case "withdrawal":
        return "bg-red-600";
      case "payment":
        return "bg-blue-600";
      case "reward":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400";
      case "pending":
        return "text-yellow-400";
      case "failed":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getProviderIcon = (providerName: string) => {
    switch (providerName) {
      case "MTN":
        return "📱";
      case "Vodafone":
        return "📞";
      case "AirtelTigo":
        return "📲";
      default:
        return "💳";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <NavBar showSignUps={true} />

      {/* Main Content */}
      <main className="w-full lg:max-w-4xl lg:mx-auto px-0 lg:px-4 py-0 lg:py-6">
        <div className="bg-gray-800 lg:rounded-lg shadow-xl overflow-hidden lg:border lg:border-gray-700">
          {/* Wallet Header */}
          <div className="bg-gradient-to-r from-gray-800 via-blue-90 to-gray-800  p-2 border-b border-gray-700">
            <div className="flex justify-between items-center order">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 mr-3 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V5a3 3 0 00-3-3H6a3 3 0 00-3 3v11a3 3 0 003 3z"
                    />
                  </svg>
                  My Wallet
                </h2>
              </div>
              {user && (
                <div className="text-right">
                  <p className="text-sm text-gray-400">Account Holder</p>
                  <p className="text-sm md:text-lg font-semibold text-white">
                    {user.username}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Balance Card */}
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 p-8 m-6 rounded-lg shadow-lg borde border-blue-700">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-2">
                  Available Balance
                </p>
                <p className="text-4xl font-bold text-white">
                  ₵ {balance.toFixed(2)}
                </p>
              </div>
              <div className="text-5xl">💳</div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setIsDepositOpen(true)}
                className="px-6 py-2 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-blue-100 transition duration-200 flex items-center gap-2"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Funds
              </button>
              {/* <button
                onClick={() => setIsWithdrawOpen(true)}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition duration-200 flex items-center gap-2"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Withdraw
              </button> */}
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-gray-900 border-b border-gray-700">
            <div className="flex overflow-x-auto scrollbar-none px-6">
              <button
                className={`px-6 py-3 font-medium text-sm focus:outline-none transition ${
                  activeTab === "overview"
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm focus:outline-none transition ${
                  activeTab === "transactions"
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("transactions")}
              >
                Transactions
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm focus:outline-none transition ${
                  activeTab === "settings"
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("settings")}
              >
                Settings
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
                    <p className="text-gray-400 text-sm mb-2">Total Deposits</p>
                    <p className="text-2xl font-bold text-green-400">
                      ₵{" "}
                      {transactions
                        .filter(
                          (t) =>
                            t.type === "deposit" && t.status === "completed"
                        )
                        .reduce((sum, t) => sum + parseFloat(t.amount), 0)
                        .toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
                    <p className="text-gray-400 text-sm mb-2">
                      Total Withdrawals
                    </p>
                    <p className="text-2xl font-bold text-red-400">
                      ₵{" "}
                      {transactions
                        .filter(
                          (t) =>
                            t.type === "withdrawal" && t.status === "completed"
                        )
                        .reduce((sum, t) => sum + parseFloat(t.amount), 0)
                        .toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
                    <p className="text-gray-400 text-sm mb-2">Total Rewards</p>
                    <p className="text-2xl font-bold text-yellow-400">
                      ₵{" "}
                      {transactions
                        .filter(
                          (t) => t.type === "reward" && t.status === "completed"
                        )
                        .reduce((sum, t) => sum + parseFloat(t.amount), 0)
                        .toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Recent Transactions
                  </h3>
                  <div className="space-y-2">
                    {transactions.slice(0, 5).length > 0 ? (
                      transactions.slice(0, 5).map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 bg-gray-750 rounded-lg border border-gray-700 hover:border-gray-600 transition"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`h-10 w-10 rounded-lg ${getTransactionColor(
                                transaction.type
                              )} flex items-center justify-center text-lg`}
                            >
                              {getTransactionIcon(transaction.type)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-100 capitalize">
                                {transaction.type}
                              </p>
                              <p className="text-xs text-gray-400">
                                {/* {transaction.description} */}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p
                              className={`font-semibold ${
                                transaction.type === "withdrawal" ||
                                transaction.type === "payment"
                                  ? "text-red-400"
                                  : "text-green-400"
                              }`}
                            >
                              {transaction.type === "withdrawal" ||
                              transaction.type === "payment"
                                ? "-"
                                : "+"}
                              ₵ {parseFloat(transaction.amount).toFixed(2)}
                            </p>
                            <p
                              className={`text-xs capitalize ${getStatusColor(
                                transaction.status
                              )}`}
                            >
                              {transaction.status}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        <p>No transactions yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "transactions" && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white mb-4">
                  All Transactions
                </h3>
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-gray-750 rounded-lg border border-gray-700 hover:border-gray-600 transition"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className={`h-12 w-12 rounded-lg ${getTransactionColor(
                            transaction.type
                          )} flex items-center justify-center text-xl flex-shrink-0`}
                        >
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-100 capitalize">
                            {transaction.type}
                          </p>
                          <p className="text-xs text-gray-400">
                            {/* {transaction.description} */}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {/* {new Date(transaction.timestamp).toLocaleString()} */}
                          </p>
                        </div>
                      </div>
                      <div className="text-right ml-4 flex-shrink-0">
                        <p
                          className={`font-semibold ${
                            transaction.type === "withdrawal" ||
                            transaction.type === "payment"
                              ? "text-red-400"
                              : "text-green-400"
                          }`}
                        >
                          {transaction.type === "withdrawal" ||
                          transaction.type === "payment"
                            ? "-"
                            : "+"}
                          ₵ {parseFloat(transaction.amount).toFixed(2)}
                        </p>
                        <p
                          className={`text-xs capitalize ${getStatusColor(
                            transaction.status
                          )}`}
                        >
                          {transaction.status}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <p className="font-medium">No transactions yet</p>
                    <p className="text-sm mt-1">
                      Start by adding funds to your wallet
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="bg-gray-750 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Withdrawal Information
                  </h3>
                  <div className="space-y-4">
                    {/* <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Bank Account
                      </label>
                      <p className="text-gray-400">Not configured</p>
                      <button className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                        Add Bank Account
                      </button>
                    </div> */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Mobile Money
                      </label>
                      {payoutMethod ? (
                        <div className="bg-gray-700 p-4 rounded-lg border border-gray-600 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl">
                              {getProviderIcon(payoutMethod.provider)}
                            </div>
                            <div>
                              <p className="font-medium text-white">
                                {payoutMethod.provider}
                              </p>
                              <p className="text-sm text-gray-400">
                                {payoutMethod.phone_number}
                              </p>
                              <p className="text-xs text-gray-500">
                                {payoutMethod.account_name}
                              </p>
                            </div>
                          </div>
                          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm">
                            Edit
                          </button>
                        </div>
                      ) : (
                        <>
                          <p className="text-gray-400 mb-3">Not configured</p>
                          <button
                            onClick={() => setIsAddPayoutOpen(true)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                          >
                            Add Mobile Money
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* <div className="bg-gray-750 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Security Settings
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 rounded"
                      />
                      <span className="text-gray-300">
                        Require password for withdrawals
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 rounded"
                      />
                      <span className="text-gray-300">
                        Two-factor authentication
                      </span>
                    </label>
                  </div>
                </div> */}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Withdraw Modal */}
      {isWithdrawOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full border border-gray-700 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Withdraw Funds</h3>
              <button
                onClick={() => setIsWithdrawOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount (GHS)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">₵</span>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">Available Balance</p>
                <p className="text-lg font-semibold text-white">
                  ₵ {balance.toFixed(2)}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsWithdrawOpen(false)}
                  className="flex-1 px-4 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleWithdraw}
                  disabled={loading || !withdrawAmount}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing..." : "Withdraw"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deposit Modal */}
      {isDepositOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full border border-gray-700 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Add Funds</h3>
              <button
                onClick={() => setIsDepositOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount (GHS)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">₵</span>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="bg-blue-900 border border-blue-700 p-3 rounded-lg">
                <p className="text-xs text-blue-300">
                  💡 Add funds to unlock more features and participate in
                  tournaments
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsDepositOpen(false)}
                  className="flex-1 px-4 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeposit}
                  disabled={loading || !depositAmount}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing..." : "Add Funds"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Payout Method Modal */}
      {isAddPayoutOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full border border-gray-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-2xl">📱</span>
                Add Mobile Money
              </h3>
              <button
                onClick={() => setIsAddPayoutOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Provider Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Provider
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["MTN", "Vodafone", "AirtelTigo"].map((prov) => (
                    <button
                      key={prov}
                      onClick={() => setProvider(prov)}
                      className={`py-2 px-3 rounded-lg font-medium transition text-sm flex items-center justify-center gap-1 ${
                        provider === prov
                          ? "bg-blue-600 text-white border-2 border-blue-400"
                          : "bg-gray-700 text-gray-300 border-2 border-gray-600 hover:border-gray-500"
                      }`}
                    >
                      <span>{getProviderIcon(prov)}</span>
                      {prov}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="e.g., 0501234567"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Account Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Account Name
                </label>
                <input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="e.g., John Doe"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Info Box */}
              <div className="bg-blue-900 border border-blue-700 p-3 rounded-lg">
                <p className="text-xs text-blue-300">
                  💡 Make sure the phone number and account name match your
                  mobile money details for successful withdrawals.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setIsAddPayoutOpen(false)}
                  className="flex-1 px-4 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPayoutMethod}
                  disabled={payoutLoading || !phoneNumber || !accountName}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {payoutLoading ? "Adding..." : "Add Method"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletPage;
