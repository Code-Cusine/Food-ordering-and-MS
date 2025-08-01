# Database Keep-Alive System

This system prevents your Neon database from going inactive on the free tier by automatically pinging it every 10 minutes while your servers are running.

## How It Works

### Backend (server/server.js)
- **Automatic Ping**: Every 5 minutes, a cron job sends a simple `SELECT 1` query to keep the database active
- **Health Endpoint**: Available at `http://localhost:5000/health` to manually check database status
- **Graceful Shutdown**: When you stop the server (Ctrl+C), the cron job automatically stops
- **Error Recovery**: Handles network issues and connection drops gracefully

### Frontend (DatabaseStatus Component)
- **Minimized Icon**: Shows as a database icon at the bottom-right corner
- **Click to Expand**: Click the icon to see detailed status information
- **Auto-refresh**: Checks database status every 5 minutes (to reduce server load)
- **Manual Refresh**: Click the "Refresh Status" button to check immediately

## Starting the System

### Option 1: Run Both Servers Together
```bash
npm run dev
```
This starts both frontend and backend simultaneously. The database keep-alive will start automatically.

### Option 2: Run Servers Separately
```bash
# Terminal 1 - Backend with database keep-alive
npm run server

# Terminal 2 - Frontend
npm run client
```

## Stopping the System

Simply stop the servers using `Ctrl+C`. The cron job will automatically stop when the backend server stops.

## Database Status Monitoring

The database icon at the bottom-right corner shows:
- ✅ **Green**: Database is connected and active
- ❌ **Red**: Database is offline or unreachable
- **Click the icon** to expand and see detailed information

## Neon Free Tier Benefits

- **Prevents Sleep**: Keeps your database from going inactive
- **Cost-Free**: Only runs when your development servers are active
- **No External Dependencies**: Works entirely within your development environment

## Technical Details

- **Ping Frequency**: Every 5 minutes (increased from 10 minutes for better reliability)
- **Query Type**: Lightweight `SELECT 1` (minimal resource usage)
- **Health Check**: `SELECT NOW()` with timestamp
- **Connection Pool**: Robust connection handling with automatic retry
- **Error Handling**: Graceful handling of network issues and connection drops
- **Auto-stop**: Graceful shutdown when servers stop

## Logs

Watch the server console for keep-alive messages:
```
🔄 Database keep-alive ping sent at: 8/1/2025, 1:30:00 PM
```

## Troubleshooting

If the database status shows offline:
1. Check your `.env` file has the correct `DATABASE_URL`
2. Verify your Neon database is running
3. Check network connectivity
4. Look for error messages in the server console

### Common Network Issues:
- **EAI_AGAIN**: DNS resolution issue - usually temporary, will retry automatically
- **Connection terminated**: Network drop - connection pool will recover
- **ENOTFOUND**: DNS lookup failed - check internet connection
