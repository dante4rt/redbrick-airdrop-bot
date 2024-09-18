# Redbrick Airdrop Bot

🚀 **Redbrick Airdrop Bot** 🚀 is an automation tool created for managing airdrop tasks on the Redbrick platform. The bot supports both manual and automatic modes for daily logins, level-ups, and task completions.

## Features

- **Manual Mode:** Perform tasks like daily login, level-ups, and task completions on-demand.
- **Automatic Mode:** Schedule tasks to run daily at midnight.

## Prerequisites

- **Node.js:** Make sure Node.js is installed. You can download it from [nodejs.org](https://nodejs.org/).
- **Axios:** HTTP client for making requests.
- **Cron:** For scheduling automatic tasks.

## Installation

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/dante4rt/redbrick-airdrop-bot.git
    cd redbrick-airdrop-bot
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Set Up Environment Variables:**

    - Copy `.env.example` to `.env`:

      ```bash
      cp .env.example .env
      ```

    - Obtain your `BEARER` and `TOKEN` values. These can typically be found in your browser’s local storage or session storage when you’re logged into the Redbrick platform. Look for keys related to authentication, such as `token` or `auth`.

    - Open `.env` and paste your values:

      ```env
      BEARER=your_bearer_token_here
      TOKEN=your_token_query_here
      ```

## Usage

1. **Run the Bot:**

    ```bash
    npm start
    ```

2. **Follow the Prompts:**

    - Choose between `Default Flow` or `Automatic Flow`.
    - In `Default Flow`, you can select actions like daily login, level-up, or task completion.
    - In `Automatic Flow`, tasks will be scheduled to run daily at midnight.

## Getting Your Tokens

1. **Local Storage:**
   - Open the [airdrop bot](https://t.me/rb_panda_bot/start?startapp=ref_GvHs8k).
   - Open your browser’s developer tools (usually F12 or right-click > Inspect).
   - Navigate to the **Application** tab.
   - Look for the **Local Storage** section.
   - Find and copy the value associated with keys like `token`, `auth`, etc.

2. **Session Storage:**
   - Similar to Local Storage, but check the **Session Storage** section in the **Application** tab.

## Contributing

Feel free to submit issues or pull requests to improve the bot. Contributions are welcome!

## Donations

If you would like to support the development of this project, you can make a donation using the following addresses:

- **Solana**: `GLQMG8j23ookY8Af1uLUg4CQzuQYhXcx56rkpZkyiJvP`
- **EVM**: `0x960EDa0D16f4D70df60629117ad6e5F1E13B8F44`
- **BTC**: `bc1p9za9ctgwwvc7amdng8gvrjpwhnhnwaxzj3nfv07szqwrsrudfh6qvvxrj8`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Created by:** HappyCuanAirdrop
- **Telegram Channel:** [HappyCuanAirdrop](https://t.me/HappyCuanAirdrop)
