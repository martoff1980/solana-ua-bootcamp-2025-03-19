/** @format */

import 'dotenv';
import 'dotenv/config';
import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { airdropIfRequired } from '@solana-developers/helpers';

const connection = new Connection(clusterApiUrl('devnet'));
console.log(`⚡️ Connected to devnet`);

const publicKey = new PublicKey('CcwMQTKPQciCS82R8tbkEhz4NRpyrF679WMo3PhHFUU5');
const sendSols = 1 * LAMPORTS_PER_SOL;
const minValueSols = 0.5 * LAMPORTS_PER_SOL;

await airdropIfRequired(connection, publicKey, sendSols, minValueSols);
