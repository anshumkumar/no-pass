"use server";

import { clerkClient } from '@clerk/nextjs/server'
interface Password {
    cardNo: number,
    expiry: string,
    cvv: number,
    nameonCard: string
}

interface Card extends Password {
    userId: string
}

export async function addCardServer(cardNo: number, expiry: string, cvv: number, nameonCard: string, userId: string) {

  const client = await clerkClient()

  
  const user = await client.users.getUser(userId)
  let passwords: Card[] = []
    if(Array.isArray(user.privateMetadata.passwords)) {
      passwords = Array.isArray(user.privateMetadata.passwords) ? user.privateMetadata.passwords : []
      passwords = Array.isArray(user.privateMetadata.cards) ? user.privateMetadata.cards : []
      passwords.push({cardNo, expiry, cvv, nameonCard, userId})
    }  


  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
       cards: passwords 
    },
  })


}