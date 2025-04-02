use solana_client::rpc_client::RpcClient;
use solana_sdk::pubkey::Pubkey;
use solana_sdk::transport::TransportError;
use solana_sdk::native_token::LAMPORTS_PER_SOL;

#[tokio::main]
async fn main() -> Result<(), TransportError> {
    let client = RpcClient::new("https://api.devnet.solana.com");

    println!("⚡️ Connected to devnet");

    let public_key = Pubkey::from_str_const("CcwMQTKPQciCS82R8tbkEhz4NRpyrF679WMo3PhHFUU5");

    let balance_in_lamports = client.get_balance(&public_key)?;

    // Переводимо баланс в SOL
    let balance_in_sol = balance_in_lamports as f64 / LAMPORTS_PER_SOL as f64;

    // Бачимо результат
    println!(
        "💰 The balance for the wallet at address {} is: {} SOL",
        public_key,
        balance_in_sol
    );

    Ok(())
}

