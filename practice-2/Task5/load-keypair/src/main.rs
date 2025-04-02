use std::env;
use dotenv::dotenv;
use solana_sdk::signature::{Keypair, Signer};
use solana_sdk::pubkey::Pubkey;
use bs58;

fn load_keypair() {
    dotenv().ok();

    let private_key = env::var("SECRET_KEY").unwrap_or_else(|_| {
        println!("Add SECRET_KEY to .env!");
        std::process::exit(1);
    });
    
    let private_key_bytes: Vec<u8> = serde_json::from_str(&private_key)
        .expect("Failed to parse private key in .env file");
    
    let keypair = Keypair::from_bytes(&private_key_bytes).unwrap();
    let  public_key  =keypair.pubkey();
    println!("Public key: {}",public_key); 
    
    let secret_key=keypair.secret().to_bytes();
    println!("Private key: {:?}",secret_key);
}


fn main() {
    load_keypair();
}