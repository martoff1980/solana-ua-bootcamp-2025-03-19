use solana_sdk::signature::{Keypair, Signer};
use bs58;


fn generate_key_with_prefix(prefix: &str) -> Keypair {
    loop {
        let keypair = Keypair::new();
        let pubkey = keypair.pubkey();
        let pubkey_base58 = bs58::encode(pubkey.to_bytes()).into_string();
        
        if pubkey_base58.starts_with(prefix) {
            let pubkey_str = keypair.pubkey().to_string();
    
            println!("Знайдено ключ з префіксом '{}':", prefix);
            println!("Публічний ключ: {}", pubkey_str);
            println!("Приватний ключ: {:?}", keypair.to_bytes());
            return keypair;
        }
    }
}

fn main() {
    let prefix = "my"; 
    generate_key_with_prefix(prefix);

}