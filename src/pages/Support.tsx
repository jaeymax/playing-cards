import React from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Support = () => {
  return (
    <div className="p-4 flex-1">
      <div className="flex gap-4">
        <MdOutlineArrowBackIos className="w-6 h-6" />
        <p>Support</p>
      </div>
      <div>
        {/* <img
          src={"https://img.freepik.com/free-vector/support-worker_1212-32.jpg"}
          alt=""
        /> */}
      </div>
      <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-normal text-sm no-underline" >How to Play Game?</AccordionTrigger>
            <AccordionContent>
              <div className="text-xs text-green-400" >
                <p>How to Play Games:</p>
                <div>
                    <p>1. Sign up by your own phone number</p>
                    <p>2. Deposit to play the games you want to play</p>
                    <p>3. After deposit successful, you can choose games you like and bet to play.if you do not know how to play the game or how the games work, you can try demo first.</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-normal text-sm no-underline" >How to Deposit?</AccordionTrigger>
            <AccordionContent>
              <div className="text-xs text-green-400" >
                <p>
                  After Registering, you can click Deposit moving to the deposit page.Then you can choose the amount you want to deposit or enter the amount you want.Please pay attention to the minimum deposit
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-normal text-sm no-underline" >How to Withdraw?</AccordionTrigger>
            <AccordionContent>
              <div className="text-xs text-green-400" >
                <p>
                  Withdraw is easy and fast. Click the withdraw button, follow steps, make sure your withdraw account information is correct.
                </p>
                <p>
                  -Pay attention to withdraw tips below withdraw page.
                </p>
                <p>
                  -Different countries have different minimum withdraw amount.
                </p>
                <p>
                  -If you see the withdrawal has x100, then multiply it by 100, that means if you want to withdraw 30,000, then just input number 300.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-normal text-sm no-underline" >How to Get Promotion Bonus?</AccordionTrigger>
            <AccordionContent>
              <div className="text-xs text-green-400" >
                <p>
                  Thanks for joining in our promotion program. First, you should know that if you only invite friends to register or share your referral to others, there is no bonus.
                  Second, if you wanna win cash bonus, you can invite or encourage them to play games. once they deposit to play games, you will get your bonus.How much you get depends on how much they deposit to play
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-formal text-sm no-underline" >Deposit and Withdraw Failed?</AccordionTrigger>
            <AccordionContent>
              <div className="text-xs text-green-400">
                <p>
                  Deposit failed: please keep your payment transaction message as the proof, and then contact our Online game
                  Support below.
                </p>
                <p>Withdrawal failed and pending:</p>
                <p>
                  Due to Network problem or withdrawal account information error, your withdrawal will fail. But do not worry, you can check your network and information, then withdrawal again.
                </p>
                <p>
                  -Withdrawal Pending: usually this problem is caused by the payment system.please wait a few minutes
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Support;
