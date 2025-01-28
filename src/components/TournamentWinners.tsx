import trophyLogo from "../assets/trophy.png";

const TournamentWinners = () => {
  const tournamentWinners = [
    {
      name: "witty",
      imageUrl:
        "https://img.freepik.com/premium-vector/logo-kid-gamer_573604-730.jpg?semt=ais_hybrid",
      countryImageUrl: "https://flagcdn.com/16x12/ua.png",
      rating: 3301,
    },
    {
      name: "sherperd",
      imageUrl:
        "https://img.freepik.com/free-vector/cute-ninja-gaming-cartoon-vector-icon-illustration-people-technology-icon-concept-isolated-flat_138676-8079.jpg?semt=ais_hybrid",
      countryImageUrl: "https://flagcdn.com/16x12/us.png",
      rating: 3300,
    },
    {
      name: "tony",
      imageUrl:
        "https://static.vecteezy.com/system/resources/previews/016/773/467/non_2x/gamer-esport-gaming-mascot-logo-design-illustration-vector.jpg",
      countryImageUrl: "https://flagcdn.com/16x12/ng.png",
      rating: 3299,
    },
    {
      name: "lord",
      imageUrl:
        "https://img.freepik.com/free-vector/cute-robot-gaming-cartoon-vector-icon-illustration-people-technology-icon-isolated-flat-vector_138676-11801.jpg",
      countryImageUrl: "https://flagcdn.com/16x12/fr.png",
      rating: 3295,
    },
    {
      name: "lampster",
      imageUrl:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEhUQEhAWFRUVFRUVFRUVFRUVFRUVFRUWFhUVGBUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtMCsBCgoKDg0OGxAQGy0mICYtLS0tLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAAAQIFBgQHA//EAEgQAAIBAgQCBwQGBwUGBwAAAAECAwARBAUSITFBBhMiUWFxgRQyUpEHI0KhwdEzYnKSscLwQ2NzgrIVNKLh4vEWRIOEtNLT/8QAGwEBAAIDAQEAAAAAAAAAAAAAAAEFAwQGAgf/xAA2EQACAQMDAgMFBwQCAwAAAAAAAQIDBBEFEiExQRNRcQYiMmHwFIGRobHB0SNC4fEzUhU0Q//aAAwDAQACEQMRAD8A+VXByJKpAWpgCtTAC1QAoQFqALUJC1AI0AUAUAyKAVAFAFAFAFCAoSFABoAFAMigC1AFAFqkCtUAKECtQYJUJHUgVQAFSB2oAtUAKkBUAKAKALUAUAXoBGhAqAKEhU5AVAHagGKAKAKAKAKnACmAFqABTAEaggjQknRAK9AKAKAKAKACagBQBQBeoAr0AiaEBQBUAKAKkBQkKAlegCgCpAVICoAUAUAqkBQAaggjTBJMUQCpAUAUAUAUAV5AVIFeoAqAKEBUBlcuPeaQwYSE4iQe8QQsUfLtyHYeQ7jWncXtOkuWWlppdWvy+EcmfYaTDR68VmQViDaHCRg7/wCIxvbiOHf3VWrUKlV4gi9hpFCksz/n6/Aq8oZ1YSzY0xpxEUkqs7ft8l8gL+Vb9JyXM5FVdxpyzCjT+/BoFzvDHhiY/wB9fzrb8WHmVbtay/tZ3RyBhcEEd4II+YrImnyjDKLi8NEqkga0A6AKAKkBQBQBQAakCFABqARtUgmKhAKkBQBQBQBQBUARoBVBBzZjjkgjaVzso9SeQHia8TmoLLMtGlKrNQj3KfK2xJxf17adWHEqwjggaSygjmwCm58bVp21d1ZN54LS/tI29GMUufPv3OzHM+JliwMD2aa5eQb9XCvvtcc9iB4i1Ly4VOHB50yydWpmS4X1+RY4jFpEgwmEXRAu1l96Y8CzNxN/68OceZvdLqdlCCgsIp5eigxMnXYzFrGgG0UJWSXystwo4DnwrLG42LEVyY50t7y2WEWEy6AWhy5HPx4kmQnx0G4HpaolVqvrL8CVQprsZHpJ0kSQ9VHhsOig2LJBGPltetqjSkvek3+JhqzS4ikfboxmOChJs7o7bEyW0+gTsj1q1oVKcTnL+3uanZNfI2UcgYBlIIPAg3B8iK3k8rgpJRcXhkqkgKEDBoB1JIUQCpAUAGgEKADUMCqASFEAr0AoAoAoAqAImgEaggVQwUuN+txkUR3SCNsSw5Fl7MV++zldu41V6jVcY4R0OiW6b3v6wdOa5PLi+olwxvIo9mxCggN1DSahIL8gCwJ4/Kqq3uPCTT+4v7q2VZptZ5Kronh2wz4sLbUS2HjZiQqQ6yzvffY9gC25ubXr1XnuiiaFLbJtot10JwGs/G42/wAsXugeeo1rdTayN8Q52LG3dew+Q2FTtIyfOjQR948WVFgkQ/8ARiv/AKagnBS5zl2LxhtGkWnw6tXPoorNSnCHUxVISlwipjweKwB7StEeZIJif9q47Pna3itb9G5/6MrbqyjNe/H7zTZTnSzHq3XRJa+niGHep5/1a43qzpXCnw+pzd3YTo8rmP6epbVsFeFAMGpJHUoBUgKAKAVABoQRvQklXkDr0BUA6gBQCNAKoIETXlvANDlPR69nnFhyj4E/tnl5cfLhXM6lrii3TodfP+DodP0VzxOv08v5Mrns0YzaVFK2fBdUoW1hJG4bq9ufY4eIrXo75WylPOc5L+lGMKu2PTBzBrc6PBtohgY5JieqQkeAJJ8fAedHx1JJupBIIsQbEHiCOIomeZCvU5CRPD6G4uVB5hdXz3FeXknBdRZbhnT/AHpVk77FVPddW5+I+VYnKWeh64KKYWvbtWPI8bcx31mXJA4M2BUxOxKHYo/AdxF+BFHHugZbNoBAQ6bx3vZT2omvu0Z5C9jp4eRsRu0arfD6mlXoJcroazo3mPtQERYdda6W2WdRckr3SAA3XnY8CCK343nh/H08/I5270vOZUuvl/BYVZJprKKNprhhXoDBoB1ICpAUAGgEaECrySSqUAqQIigHQBUAjeoAV5bSWWQsmqyPJuqtLIPrOKr8H/V/CuN1bV3VbpUn7vd+Z1mlaSqa8Wqve7LyKbp90q9mHs0LfXOLswveNTwAtvrNxw3FxzZa1tNslP8Aq1Onb5/4LevVx7sTzZMomeZFRz1qMWe1tMZHFS3AuLHUbhV93kbXVSrFLkw0acm8ovscezpuCWKpccLuwXb51px5ZvN4OwTkKqKSqgDYGwJtuTbieXkBXnGWEfGvSRDEw2o0EcmXOSzRcSt2HivG/wAt/n3VMuOSUzsvUJEhUnnucWY4e41jiOPiKJ4PRTTyADfdTcGsi68ESfBLA4Ex4Y4mNiOonCyG+6FrNBMp5XNkPK4RuVbKmpPa+6/2V04uPJ6hgdOZ4ZcUmkTi6SAW0u6bHyJFmB7mAPhpW987Gv4NR+4+V8s/XJo32nK5h4tP4v1KcjkdiNiDsQRxBrq4yUlldDlGmnhhXsEqAL1ICpAUIImoAqEk6IBUgKAKgETUAKgjJoujWWcMQ4/wwf8AX+Xz7q5TXNT/APhTfr/B0mi6du/r1F6L9zQsTYkC5tsO81zEFmSTOolwjxbHddh3GKxFjNiIxJh2W5VZJiAshJ46VMzgciAN7C3ZypqMFGPRfoVNOW6fPUhFj1w8JjT3nsCeYRdwo7yTuT4CtJxcpZZaLEVg45sceqLg9pGVxfvVg34V7jH3sESfGS3GaRyNqXsqwUgfCdI1Lfuvex7iKx7GuD0nnkT4vQbMLg8GHdTBOCXt0fxfcaNEJFJnWP0yiaK6kWuRsb/EO7ff1NZaccrDPE3jknhs1J31WvvwGk38OVeXBo9KWTr/ANrEcQPvqNpLZE50OGkfM/lTayMlNjW3up9P651kieZF70AmAlCzBTh3mg6xXXVrMayFBa9rAtHe4P2eFbMIJ+95Ghczxwu56h0QwiRwF40CLNI8qKvuiOyxxEecccZ8ya5vVau+4a8uDbtYYpi6S5ZqBnQdofpAPtKPteY5+HlVloepbJKhUfD6fwUms6duXjU1yuvzRmK7A5YYqSR1KAVIChBGgCvJJKpQCpAVAImoAUB2ZRgevlCfZHac/qjlfvJsP+1Vup3qtqLl36L1NzT7X7TWUO3V+htwOQFgNgO4d1fPZScm5Pqd/CKjFJDWoJl0PH+m2IuWjB1rhZNAK20xjrSyrfwjkC7XsRyrtKLc7dNrDwU0Wo1sroY2bF6mJvt+FY1HCLLdl8Gg6F5I2YYgQbiO2uUj4L2C35Fv4Bq8ye3k8ylxg6elnRDEZVIzBGkwpJKyKC2gHfS/dbv/AO1SpKovmY4VNvoUXtlxsbju7jXnZg2N+TnaQ8VNetq7kZ8iBxF+y1Ttx0IyWPRjozPjRIMK6GSMgmJzp1IwNmVuF7qRY25b17lKPG4w5cctEMywGJwh04nDSw8ruhMZPg47J9DXnYnzHk9Ksu/BWyuD3eBHA0Swe85PkZbcT99Sk2Q5JdTSdHLmOMbKrymNXB31yWXrCDtZbA+UdbCzGDaXJW15Rc8t8HuccQRQiiyqAoHcALAVw823Jtl1DGOCYNeE2nlCUcoxme4DqJOyOw/aTw719L/Iiu/0i++00Ofijw/5OG1Sz+zVuPhfK/grqtytGKAdSANSBGoAqgDoAoB3oCJoQBqGDX9HMJ1cIY+9J2j+z9gfLf8AzVwmuXXi3GxdI8ff3Oz0S18Ojva5lz93YtKpS7KvpBmPUx2U2d7gfqr9pvwHn4VcaNYfaKu+Xwx/Up9XvvAp7I/E/rJ5hlGXPimnmsOqkIZFJ7LIhMRdlHG5C8bjtC/KurypTZV+9Roxz951/wDhWLE4adVjVMTANSsu2rTcFGA2K9X1Bv3sTXjw08oyu6lDZNdGaL6CsKfZ8RPoszOFQsCoYIm3atwDFwbXtvVZccNItXPciyz3ojmmM1GTMUseEKdbFEB8N03YeLA15U4roItLqjzfO+hE+COueBxH9qSFw6W59sjsH9sAVmjUz8zKnB9OC7w/0UPiY0xGGxyPHIodNcRVrHkSrHccDtxFeXVS4aPG9plbn/0bYjBQPiZ8TCESw21lmYmyqARxJ7zYceFTCpGTwket+T4dEckzJG67BpOGZdJdFVEKkg2Dy2DC4G4qZtdHgNx7s9FytM/j/SpDiEPvRzPEGI7g8a2HrqrHmBje3tk8l6aBVxuJtH1dpWvGNNk2W63Xs7EnhWaKbwZISSiaTLMijw2AjmZAcTimIViAWRCpjsl/dsZVJI46O6t3ZhJFQ7hznJ9kLN8qkiCTKFvFrmIUWDRxBFmFhYFtMwIPHY17k1GSwYIZr05JnoHRbMutTqiblQCh+KP/AJbehHdXO65Y+HLx4dH19Tc0a9ck6E+q6F5XPHQHDnmE66FgB2l7a+Y4j1FxVnpN39nuE30fDKvVbXx6DS6rlfXzMSK+hJnCjFSSSqQBqQI1BBGoJJ0AqEBQkVAfTCwdY6xj7TBfIE7n0Fz6VrXVXwqUp+SMlCm6tWMF3ZvyANhsBsB3AcBXzWcnKTbPo1OKjFJDUV4wepPCPOemGPMiYiRTsI3CHuVVNj+PrX0Kxtfs1oo98ZfqcNXuPtN4pPplJemSHRfGo2HwxX7MTYdx3XQSKfV4E/erzHqmWteO6DR9sDjwmPjAPZnjeNh4hSTfz0oKzx4qepXzTds/k0y6+jfNIsLDjoZ5VjTDYlm1OQAqTDUo9WD276qrum/E4Li1qbqSZWdIfprhjJTB4cy/3kpMaHxVPeI89NeY23/ZmZyKjKPptn6wDFYeExEgMYg6soPE2ZmDeW1enarHBG89tiVQoCgBbCwAsAOVhyrT9TIEkasLMoI2NiARcG4NjUZB5V04+l18JiJMJhsOjNE2hpJi1iw4hY1INvEn0rbp26kstnjdycGRfTcxYLi8Kuk8XgJBXx6tyb/vVMrVdmFI+f0nZPhsQkGZYbEBkxMscKRoihDqMjyOTcENcPquL3O9erdPdsaIqVNsGz753MBjsPCb6cPBqAHxNdSLeWg1ZzS3+hRUc+BKXmzpzPMkjieQ8FgKAHm8hdmHqpi9BWKXVm7bxagkVvRLFtHDh5RuVRPUWsR6jas9Wgq9vsl3RUSrOhdOcez/ANnp4YEBgbggEHvBFwa+dVIOnJxfY7ulUU4KS7jU15XDPbWUYXNcN1UzoOAa6/st2h/G3pX0bTq/jW0J98c+qPn19R8G4nD55XozlrfNQlUoBUgRqGBVAHQDqWBNUAVAWvRiLVOD8Cs3qez/ADGqPXquy1a82kWui0990n5Js11cKdwjkzafq4ZG56bDzbsj+Nb+m0fGuoR+efwNDU63hW0pLrj9TAYuHWjp8SsvzBFfQ5LMWjhKUtk0/JowuU4orEpBIKW1D9hgbH92q1HVyjuiXmNzHTJh5eHVyqSf1QQ7D1CW9ayN8pmlGn7so+aNPlsSSZnjcG8SyR4iBHZWFwTFJYG3eNdweVq09RcovdE29I2yp4mbHI+j8eFIGHwiR8Lkotz/AJyNR+dVTq1JPllxKNFLt9xqJ8OjizorDuZQw+Rr2mzUwSmkCqWPAV5ZMY5eEUuVZy8sjqV2EjJ5DZgfHZhf1ry3ho2J0Uo57oufZ0uW0Lc8TpFz5msmWaxns7yBMQSJcNHIh/u0JA8Da4PlXnfUT4Zsw8Lbhrn5mF6X4dYJstwMcYjiWWWQLa3w2Jvzu7Vv2DlOo3Ir9S2xo5iUOOxt8dipQLjUEHho+rNvD6sVZN++2VdOn/RgvvM/nOMJRyTxLWHnZdh5AfKsUmb9OG2KNpl8HVxRx/Cir8gBVlBYikctWlvqSl82bro7Nrw696Ep8tx9xA9K4XXKPh3Ta78nYaJW32yXlwWVU5cmY6WxWkR/iUj1U/8AVXY+zlXNKUPJ/qch7QU9taM/NfoUddKUIxQAakCNMgKgEhQBQCNAKhBf9EF7Up/VUfMn8q5j2jl7kF6nQez6/qTfyRpK5E64p+lL2hA+KRR8gx/Cr72egnct+SKHX54oJebMnXbHIHnub4bqcTLHwDHrF8n4/fcelVlWO2bR1dhVVWivwPlLiCwXUbi638ibH7iaxtvBseHGPQ9C+j2Qtm0bE3Jwb3J4++lYr74Ua9isJo9mNVZvGQyjpLjSzwz4EPLEbSDDP2gCSFk6qUj6tgLhg55jiCK2vsyazFmPfjqW7dIowdL4fFqe72LFMP3kjZfvrG7eoT4kSA6QQLwgxW/w4DGf/lUK3n5Euon1Zz5v0imijMi4J0QW+sxJESksbBUiXVJI5NgE0qSSADWWNq/7mefEXYtcjbEHDxtigonZdUgQFVUsSQgBY8AQDudwa154zx0Mh5r9KptmGE/wprf8Fbun/EzXvVmkvvPMhiWDO2o3JufPSCfvJrb3PLEKcXBCyzDmfERRncA63/ZTf7zYeteqUd00jDe1fCoNo9FqzOUNL0RfsyL3Mp+YI/AVyXtHD3oS9TpvZ6XE4/Mv65k6co+lqfVxnucj5rf+Wuj9m5f1Zx+X7nOe0Mf6cH8/2MxXYnKjqQFAI1JDFeoJJ3oAoBGgEaEGh6If2v8Ak/mrlfaTpD7zo/Z74p/caKuTOrKTpb+iT/E/kaui9nP+eXp+6Od9of8Aij6/sZauzOUKvPcmXFKN9LrfQ/dfiCOYNYatJVEbdpdyt5Z7GOx2WYiEASRErf347utt+7ceorRnRnHqjoKd9Sqrh4fzL7o1n5weMXGzQyLC0ZhV9J7F2VtRHG3ZPnva9qwXVOVSPBls50otxznz+897yrNIsSgkjdWDC4KkEEd4I4iqnlPDNyUNvPYMwyuKcqzAh0voljZo5UBIJCyIQwU2F14G24NZIVJQ6GJxTPlHhsWmyY8uP7+GOQ+V4+rJ9b1n+1Pujx4SG0WNcWbHKnjDh1VvQytIPuqftXkh4SDC5NGriV2eaUcJJnMhU2sSi+5ESCb6FW9YZ1pS6nuMEuh1YzFpCpd2AAFzcgcPE8POsPoZIxcjwjp10mGPxaS4WNpEwwcO6i4bXpFlHEgaePPc8BerKzozhl4Ne7q0cKDZmYMvnnZ+rhIViTqcFFFye/c8htW3GlOXRGtO8pUY4kzQYGCPAdntTYiT7KC7t4AfZQd5rY3U7aLcmVjVfUamILg7vbsRHLFHPFGnXatKLJrkSwvdwNreIrFa6hG4liK48zJfaO7WlvlLnyNv0Q/tf8n89U3tH0h95n9nvim/Q0VcqdYU3Sv9Cv8AiD/S1dB7O/8AsS9DnfaH/hj6/sZWu0RyQVJIxQAalgjQExUAKARoQI0BedEpLSOvel/3WH/2rm/aKGaMZeTL3QJ4ryj5r9DT1xqOxKnpRHeC/wALqfndf5qvPZ+e26x5plHr0N1tnyaPPs1zUxMsccLSuVZ2VTYrGvFvE9w512Fxcxo43HO2Wn1LrO3sdeBxiToJI2up+YPMEcjWeMlJZRp1aUqUtslydAr0eDkxOd4fDkrMyMCLPEw160PEFRc+vhWndxhUhtbw+3yN+xjXjNThHjv5GayjEYqB3xWX6oIHcmOGRi4ZR2bm/iDvx5X2uaWpVppqFTl+Z2NChVlDdH8DeZL9L6raPH4dom+OPtofG3Eel/OvPgZWYPJ4nHa8SWDaYDpxl04umNi8mcI37rWNYnTmuqMZOfpVgIbs+PiseXWIbeAAryqcm+Ez0+hkM/8ApkwkV1wqNO++/uRj1O59AazxtpP4uCMxz5mFzLE4/Nu1iJdMbbrEmy94uOLet/SvE7ilReI8s3qVnOosy4QZDmaYZWwuI0xSRNp3GkODuG8/Pwq8tLmnKmmcjqdhWjWbim/2/wAGjilVwGVgwPAggg+ordTTXBTSi4vElgq2inw80ssIjImA1SScYSoAv+sth7vf4VV32nq4knJ8dzoNL1dW1Jw289jjy7KJJ0mxYneNQrMkpt1k7ICescnhFcWCCwt99dWv421SNGivX68y5o6fK5pSq3DN/wDR5KZcL17Cxk0X8wtzbwu1aev1d0oL5Gno1BU3Ux54NRXOnQFD0ufsxr3szfIAfzV0/s3D35y9Ecx7RT4hH7zNV1yOYCpAwaADUsgjTBJMVACgEaAVQyA6M59AcWsaSqWvoYb2OoadjwaxIvbuqp1SMa9tOMeq5/AtbCFW3rwqSWE+PxPQ64A7lPgxf0nvIIsPaZ4YjNpmdDaxKHqi5+DUN77cPCrjSZbZSklmSXH74NW5pxqYjP4X1MLl+ZOGTGuNSoXw0rqOy0eoFZlHw6gL10F9RldW+e5V6bWp2N26WeH9fsn6HVlKq2Lmkw+0PB7G6SS8bqPAcTzrNpUayprxDW9o6lu6mKa5+snbjHnxE8eX4T9NLuz8oY/tOx5bfhzIrburhU1grLCz8R+JPp2+Zpz0Ry/DxnDxQiR/7TEyANK78yhPuC/IcfHe/HXepTlLEHwdtY2O1b5fcjg6Oyrhj/srE2CM7NgZWtou5u2GZuWpiSt+ZI7qzzxeUd8fiRDUrSru/tf1+RwdK8khSTD4h4gUSdUnRvd0udN2HcG0386x6dXn71N9cceqNi8gpKM+37M75+hODM1/ZgYpW3UXBw8p2FipBML7C32Wtybs76rzlHh4a/M05Uowl7yyjrxf0eYWCJmTCrrJCIXDOFZjbWyux7Ki7Ec9Nhua8xr1G/efBEo0ukIpsqeluWQR4aHAwwqOslUKdI6w6LGWUtx1EADb4wKiNeTcqj6JGbwUsQ7tl2giwkRkchVRbu3lyH8AKoVvrVMR6stZSjCOX2KXKcg9sLY/FRrplbsRuAW0ILKLcgOZ7zblVhXruhBQpvpx6vuzRpxjUm98ct/l5L1K7P8AIDl98Zg79UDeaAkldPN1vwt93lcVv6ZqsnJQqdf1/wAlZqmk05wcor/H+PkQzUNioEMFmVirMpbRrjFyU1W23sD5GulrKVSn7j6nJWmy2r/1l0Ppip8TikGHaAYaGwElpFdnQf2aafdXYX8KpbXRvDq+JN5Zf33tDCdHZSWD0rIcIIcPGlrdm9uFr7gegsPSud1WsqtzJrouPwN3S6Tp0I7ur5f3nfVcWLMp0pm1TBfgUD1btH7itdv7P0dltvf9zOK1ytvudq/tX5lPV+UwxQBREgalkEagkmKAKAjQg+OMQtG6rxKMB5kECvE1lNHunJKab80VBhWTLIJogFkw6q68jrj2lXv7Vm25m1cdGrOlfOMujf8Ao+kVKELiwW1cpf7+vM9Dk6Qg5c2YIA5EBksfiC7g+tV1Szxd+E+jf5M1aFfNHd3XX1Rksq6UTRkLmLLPhsQAGYxqFhZuCsoG8RuBc8K3JUKc8+Atso/Pr/kzzpzpxUp8p/kXfSPK0jIZEURSLYKoGgG3AAbWI3+dXWi3njU3SqfEv0OS1m1dKr4sej/JmflePCwswUKiAnSNh5DxJP31dPFOJVRU69RJvLZb/R9gjh8I2Mk/3nH9u/NMPfsAd2rj5ae6uQ1a7edifJ3OmWcW1x7sS4Fc8dIceb5dHiYmjkUEEG3ge+s1CtKlNSiY6kFNYaMpluctLD7LjG1rJEQs54hS7xqsp5kaNn8r77m+urXbKNen164Kezrbt9GfRcF70CwGLliaPD4wddhyEkgxC9YCv2JI3DKwRhtYkgFSALWrcVOlWiprg1qlSpQk6b5RqMTl2blSZHwcaqCS5MrhVAuWKkraw341H2OPds8q72/CkYXKptTvmOKn1oPq4GZOrGi/FIhcgu3AbsduYqtvW5yVvRXqWdr7kfGrP/C/ySw6vmbLK4KYZWvGh4uQba38e5eXnWvNxs4uEeZ935fJGenm4xN/D2X7s1KMLADgBYW4ADlVZLLfJtxil0Gygggi4IIIPAg7EUi2nlCUcrDPPcjjOFnnwB4I3WRX5xtv+K+t67/TLlVqSf18z57rlr4VTcvT+C4x2JMMTz9UZBEAzKL2sSANRHBb8fAGs93VUY7c4b4RW2Nu61XpwuWfXoxmWPxWMVhixLEm+I6tFXCqGW6xRn3pHuQb8udcrd07enReY4b6f9vX5HawUtySlnzx09PmehySBQWbgoJPkNzVJSpurNQj1bwZ61RU4OT7GCxExkZnPFmLH1N7V9Kt6KpUowXZHzqrUdWpKb7vJ862DwMUAVIA0ZBGoJJ0AUAjQCNCDPnLMQjyJCyLFI5k1NdjGWHbCpwO+++1VNfTY1au99DpLPXnb23h9WafovhkihbL2YmKaNo7tydwRfyN7egrX1Oz92NaHWH6GDTtQbrSjPpL9TJYWaQoMB1WvFAthzCeAKbF3/U02N+dVc6KVV1s4h1z+x18btfZ1DGZdMfueoZFkIgwUeCkkMmlbFjyJJbs34BSbDwFVkr+SufGp8fXf1NSpaRq0XTnyeddKcFLNi48riTrW1q8oQgDqxYjU32BpNyTw2rrZXsa1BTXBQWdg6FWW/0X8noMiBBeRw72C9gaIIgosEj+0wA2ubDbhXI3U6cm9vL8zsLWFRJf2x8u79SkxOeJHMqEgowsWG+l7nj3jhWOnaucG11N5zwTy3N45EJLWOqQb7bCRgBfyApVouEsfJfoRCW5Ga6NwrJIkbC4OHcEf+5nq61Kbjb05IptOWa9VfP+T7dXicqxCYvD9oJcAEmzxn3oGPwm2x4qQOI4ebK9jPh9fr6+ZsXtpvj7vb6x6F50w6c/7XWPCYFZDEyq+JJBW54jDs3JQd2I42AFxet+5uI0oZbwVtpaSnPlcIpczyxk9neV9TdfCqqBZIwHBsi8Bw47k8yar9OrqdfbFYX5v1N/U6e23bfX66HRkuPEeBiUHtFCf2QWY38960bym5XMn8zcsf8A14eh8sqzsiOOJBdmGpiTYKG3F+7+vEiatstznLoZYTykkaqENa5bUfAAD04n5mq6WM8LH6mZGK6dEQz4fHLtoPVTDcHQ1ypI7ra9/Kug0Wu4Zg/VfuUGt2vi0/Xj+D03K8CsUQQWbULs3J7j/TbgPzqr1C9ncVnLpjoYtPso29Laur6n1wOBigQRwxrGgJOlAFFybk2FaNSrOo903lm9GCisIqelOO0qIFO7WZ/BR7o9Tv6eNdF7P2W6bry6Lhepzmu3mIqhHq+X6f5/QzVdgjlwqQO9AFSANQCNAToBUAEUAqAKAVeWkDU9Hp4pWLmNBiNIVpNIDyIvC7cTba48AfLi9Zs6lB5jnw/LyZ1+kX8a0dk/jX5lxNMsas7sFVQWZjsAoFySe61UMIOclFdWXsmksnlHRPC4nGSYzExymDDzzNqxGn6+SMMSsMV9lG4ue8Ab6bV3FCyU6cYyXCSObu9RVBtr4mW+M6GYJhdlmLD+0aaRpPMm9vuqyVpSSxgp/wDyly5ZTMxmuTTQKzQze1Q2OpbgzRjvBHvW/oc6r69hFPdAvbLWpP3Kq+vkR6L5gJVcX3DBv3hv/wAQb51S3tLa0zp7Oqppn0yHFsk6kco5P/kSn8azahHdbwT+uDR07/nqev7m2w+bRkHX2bAk34G3cfzrn/AknwXbaxk58px0aQIxIBcdYyrb3pO2Rt3arb91ZbiEpVWuy4/Dgx0liH5lN0izMuYdrATxkd978z6VZaVTUa+TR1Xm3ZnpMwEeCQX3MQHlqH8d6zOi53LfzFOqqdrH0Ozo7hcTiABEoiQ7vLILtwsAieAsBfuqxhpvivM+hS3WuRoR20+WajC5Oi3RMfOX56ZU2P8AhhdI+Vbn/i7V8OKKaWu3ye7OEU/TCGVIDHiCJY22TEBQrxte4WZBsVNveFt+VaFTS/s01Uo9O6Ley1uN3F0aywzq6IdPj7LHhfZ3mxSDq1VSFV0Qdl2kbZbDY8eF+dVV3p0XUdVyxHqzfo1JYUEsss8T0sx8YdmgwYVPevO/YNgbE2AvYjh31hhaWsmknLn5dTNOFeMdzxj1KnBZs+IiOKmWzNqcgAm4F7FRxtYbCuztoxp0UksJHB3kXK4aTy2/r8DkyfN3nezIqo8fWR6W1MFD6bPbYMeNuVRQufFnKOOhmvdP+zUoTbzkuRW4VoxQBUgDUAVqnAJCoAqAdAI0IFQBUAlFIUYMpsQbgjiDWOrSjUi4yWUz3TnKnJSi8NHw6dZ82Kigy9OxJiZVWUjh1akXI8Cd7fqkVzlDSFb3O5PjsdRT1R1rdtrldTWtAkKpBGNMcShFHkP410tOKiuDlqs3Obkz4zSBAWY2A4mvTPKWeEZPOMXHMbrGFblJwf7uPkb1hlhm/RhKPV/cY7HYaXDye0RqSD+k0cCPi08j8xVbdW2+PKOg0+/2NLJ0ZRi4w7SDcPtcEnSbliNJ4Ak3qpuIVJRUX2Oht3TUnOPcu5sShRu2N1I8dx3VoRhLcuDelJOLObDZigjTiewvLnpHfWSdGTm/U8QqJRRxZti+sQqRYXBBubg32N+Vq2LaGyeV1MNy1ODUuhU5eyFlYo0rns4fDoCxsODEDntf7+6rqjCMeXyzmr2rOp7qeIrv8jax5JmEihpodK8RAJUVR+0ga7/5j6Ct1KT6lLKpQhxB8+f10LrK8foIgkiER4KANK+AsNh6bVmi8cGhVp595PJ153EHgkUi4twPmK9TWVgx0ZOM00eYZZH7NiGRdmjYSRt+qwAKnw2tXPX9PGU+jO90usqkc90XGOkhxuLjKKzDdsQu3VB1W0bFvtE2tp8AeRppNvOPE1x2fyNbXrpRp7YS58jtmzlNRSKN5mX3urAKrbkXJCg+FXFW7pUuJM5y20u4uPeiiWTwwMPaoU0mUbnhwJuCOANwb242rNTUH70e5qXEqsX4VR/CWVZjXGKABUgGowRpkExUAVAOgI0AUIM3nuayCRkjmSIQqGcuL63bdIrcdxfhvVfc3UqclGKLzTdNhXpSqVPuPvk8+IzL9ETh4lsJJLBnaSwJRL8AL8fEVpX2q+Ckl1N/TtBVSTc+UVONw3suYRWmkkCkqHlbU2rTtvy3avNhdSr4lM2tSsYUKbjBcHoEfSFDu6sDztYi/wA6u1I5CVvLPBw5xmYlAVAQoNzfmeVRJ5MtKk48szOMHaP3Vgl1N+HQ+SyEcDaoPTSZxYvAq51p9XJ8Sjst+0v4/wAaxVKMZo26FzUpM+KY4odMy6Dyb7DeR5VU1bWUeh0FvfwqLkgcxiRiNdwbHsgkA73/AArz4M5JcGV3VOLxks8uyLFY/ZV6iA8ZZVILD9ROLfw8RW5b2TzllRf6xTgnFHouQZLBgE0YdLMR25WsZX9fsjwG1W9OjGCOSuLupWfvPg7zWY1iLIDa4BtuLjh5VATOTOntC/iAPmRUS6GSiszR5jmUHWYsRj7UGk+rMBVNqEtvPodho0HJNev7Ggy+BZMIqRjqtcduxtpYizH53q1glKn7vdHMV5Sp3L384Zx4PLZpEWCVVhhQaWSM/pj33G6oe7ib71X0NNxUdSpz5F3ea9uoqlQ445L+KNVAVQAoFgALAAchVsklwjmnJyeX1J1JBKiAVIEaAjaoBMUAUAqADQCoDgxuXxMWl6pTIFNmIBNwNvWsM6ceXjk2KVeaahueMn36CyL7DCse7EOWPcxdrlvy8q4bUc/aJbvkfTtPS8COPrkpumeUnWbE3NpEb9Ye9v3339RWzY19uDzeUFUi0zkwOdq9lk+rkFg4Owvw1g/Dfj3X7heunpV4yRxVxZTpyfBbspBseNbBpHPi0UqSxAtvc8APHwrxLB7pt5wUPtjMNUcLOtyA/uq1uOknjWu6q7FlC2k0cuKx0jHQAYj3tuSe4cq8Oo3wjLC2w/eJ4HDxynqpS4c+62slGI/VOwPhXqCUuJdTHXU6XvR6Fxh5At4XRRYD3BYEcmA9PQisywuGjSks++mWcb3Hv6vHn61kTNeSOiLEunuuw8ibfKvWTG6cX1RpspllZLyD9k8CR4iskWzSqKKl7p9cXjo4vebfuG5+VS2keY05S6GbzfNxICznREnaJO58PNjwAFYpz8zeoUGnhcszmSAs8uNkGkHdQfsoo29bVzWoVvFmoRO60u18ClukWXRnEr7PGpYaiCbHb3mLW3866O3aVNI4W/jKVec0uMlzWwjRCpIGKAdSiQqQRNCGKvJJMUAjQBUgL0AqgAaMgo8Fi3yyRh1bSYWRtQ0C7QueIt8J/rfjzup6Y6vvR6nZaNrMYx8Op9fNfwPPOlME6KqQzOQb/oyttu8mq230yvFvp+pd1dWt8GVxuuXb2U+BZlDCrSla1IdyurahQmuUd2W5zJAqxYpSUGyyLZnjHcw+0v3it+FRw4kU1WhGq91Lr5HVKUxmITDrIHhVetkKnZrEBUPMbkXB7/CvNapnhGSzoOPvSXJZTgDCx2FgGIA7gCwsKwosEU2gMXBFwbXB8v8AlU9wytxEViUueTKeY32N+8Efwog0msMtpJDNAs4H1kd9QHO20i+trjyFbWd0dxT7fDqOD6P6RNJOBB47gipTPLj2ZZYB3BDk8OAIB9d6yRya1RR6Fq2JxMnN7eA0j5iwr3lmBQgjN9IM1WIdVGwkmbjpN1jHPUw4t4cuJ5Vr1KuOIlhbWzm90lhFNDhZZbO8oa3BSpKqfBbgX8bVgdNzXLN1V40Ze7Et5AZE6qR20bXEYVLgcjsTb1rFTsaUJbucnutqtxOGzjBZ4JsOpGxBHDVvb5bVZQcShqqsy4VgRcG48Kzo0WscDqQO9SAJqQFAI0IYV5JJUAqlAdSBVDAjUADUsHFj8PI/uOAOY3F/UcaxTTfQz0KkI/EiuOVSeHzrD4cjbV1TINl0g30j94fnTZI9K4g+hWz4UMeP4isbRuU6zicuUP7LijYCzpw4X3BIHyrWlHbIsaNTxI5LNcWXijW1gBfzJ3v99QuhmRyxtu57iPuUH8aEFPicQDLcm2x4921v4VGeSTtyPOY4y4Y7FtQvsuygG54725A1lp1ElhmjdW8pzUkcuEzQqgRIyzC4BPugXOnzsLbUVR4whK3zLLZ9EfEH/wA1NfnodlHyFMS8z04Ul2RNsteT9JLIw7nct91evDb6sxutTj8KLPL+jm2pQLHxte331ljQ8jTq6hteC1iyVhtqUeVz+VZVSZpyvU3nB91ydebk+QA/OvSpGN3kuyPsmWRjkT5n8q9KmkYnczZ1ooAsBYd1e0sGFvPLJipAUAV6AUAjUEMVQSSoAqQBqQAqABoBVAChAUJERUA55MDG3FB6bfwrw4R8jIq1RdzP9JMtjIHVBhKhupF7eIJNa9anFrjqWdjczjLMnwVMWKlVQpwslwLdkFuHkK1NsvIulcU/+y/E+Sw4qS4XDSbkntAqN+HHjyqVTm+iPEryhHrJfid2D6KOwvKt2Jue1YDw2rNG2eOTQq6pHPuvgs4+jC2t2QPU1mVujVepyOhOjyD7Q/d/M16VFIxS1CbOmPJ0HM+lh+FelSRhd3UZ90y6IfZv5k168OJjdxUfc6UUAWAsO4V7wYW2+pKpAUICgChIxQDNSAtUgBQCaoII2qCSV6AKkBapAWoB1BAr1BIUAUAqAKAKjBAUwSFSAoAoAoAoAoQFCRgUAjQDAoAoB0ArV6A6AKATVDIZGhI6IhDvUkhegHegFegCgCoAUAUAqAKgBU4AVAHQBUgKAL0AUICmCQoApgBQBQBepAXoAvQBegEagBUAKlEIKkkKABQAaAKAK8gBXoAaAKARqGB0QCjAVACpAVIAUAUACgAUAVDAUAVICgAUAUAUAV5AVAP/2Q==",
      countryImageUrl: "https://flagcdn.com/16x12/au.png",
      rating: 3291,
    },
    {
      name: "alpha",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvXcLBAnNaG9u_juSWT6vyOeW1Q3N3xh0QWA&s",
      countryImageUrl: "https://flagcdn.com/16x12/ng.png",
      rating: 3288,
    },
  ];

  return (
    <div className="flex-1 form rounded-md">
      <div className="bottom-nav flex font-bold p-1 items-center rounded-t-md">
        <div className="w-7 h-7">
          <img src={trophyLogo} alt="" />
        </div>
        <p className="ml-4">Tournament winners</p>
      </div>
      <div className="players p-1 flex flex-col gap-2">
        {tournamentWinners.map((player, index) => (
          <div className="player flex items-center gap-2" key={index}>
            <div
              className={`w-8 h-8 ${
                index + 1 === 1
                  ? "bg-yellow-500"
                  : index + 1 === 2
                  ? "bg-gray-400"
                  : index + 1 === 3
                  ? "bg-red-300"
                  : ""
              } rounded grid place-items-center`}
            >
              <p className="font-bold">{`#${index + 1}`}</p>
            </div>
            <div className="w-8 h-8 rounded-md ">
              <img
                src={player.imageUrl}
                className="w-full h-full rounded-md object-cover"
                alt=""
              />
            </div>
            <div className="flex-1 flex items-center gap-1">
              <p className="font-bold">{player.name}</p>
              <div className="w-4 h-3">
                <img
                  src={player.countryImageUrl}
                  className="w-full h-full object-contain"
                  alt=""
                />
              </div>
            </div>
            <div>
              <p className="font-bold text-xs text-white">{player.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentWinners;
