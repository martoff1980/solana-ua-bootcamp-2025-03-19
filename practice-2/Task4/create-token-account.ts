/** @format */

import 'dotenv/config';
import { getExplorerLink } from '@solana-developers/helpers';
import { Connection, Keypair, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token';

let privateKey = process.env['SECRET_KEY'];
if (privateKey === undefined) {
	console.log('Add SECRET_KEY to .env!');
	process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl('devnet'));

console.log(`🔑 Our pubic key is: ${sender.publicKey.toBase58()}`);

// create a token account for the recipient
const tokenMintAccount = new PublicKey('BYeSuB2PGWQuYpc5UvzYDzTSis6PUUx2i8twdotnNZdJ');
// recipient address
const recipient = new PublicKey('AnJqC4JBzFFZsDFnT11u528yEZnmKMb75EaP8kwV8b7A');

const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, sender, tokenMintAccount, recipient);

// Token Account: GQRgeaTEbRMzPqzvtzJT1DZRS8oiqH2ETPiwXBxEkDxG
console.log(`Token Account: ${tokenAccount.address.toBase58()}`);
/*Created token account: https://explorer.solana.com/address/GQRgeaTEbRMzPqzvtzJT1DZRS8oiqH2ETPiwXBxEkDxG?cluster=devnet8 */
const link = getExplorerLink('address', tokenAccount.address.toBase58(), 'devnet');

console.log(`✅ Created token account: ${link}`);
