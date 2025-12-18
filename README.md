# Gabbot - Premium Cologne E-commerce Platform

A full-stack MERN e-commerce website for selling premium colognes.

---

## 🚀 How to Run the Project

### Method 1: Double-Click (Easiest!)

1. **Double-click `start.bat`** in Windows Explorer
   - This will start both backend and frontend servers
   - Two windows will open (one for each server)

2. **Wait for servers to start**
   - Backend starts on: http://localhost:5000
   - Frontend starts on: http://localhost:3000
   - The frontend will open automatically in your browser

**That's it! The website is now running!** ✅

---

### Method 2: From Command Line

**If using Command Prompt (cmd):**
```bash
start.bat
```

**If using PowerShell:**
```powershell
.\start.bat
```

**Important:** In PowerShell, you must use `.\start.bat` (with `.\` at the beginning). This is a PowerShell security feature.

---

## 🛑 How to Stop the Project

### Method 1: Double-Click (Easiest!)

**Double-click `stop.bat`** in Windows Explorer
- This will stop both servers
- All Node.js processes will be closed

**Or simply close the server windows** that opened when you ran `start.bat`

---

### Method 2: From Command Line

**If using Command Prompt (cmd):**
```bash
stop.bat
```

**If using PowerShell:**
```powershell
.\stop.bat
```

**Important:** In PowerShell, you must use `.\stop.bat` (with `.\` at the beginning).

---

## ❌ If You See Errors

### Error 1: "Node.js is not installed or not in PATH"

**What you'll see:**
```
ERROR: Node.js is not installed or not in PATH
Please install Node.js from https://nodejs.org/
```

**What this means:**
- Node.js is not installed on your computer
- Node.js is required to run this project

**How to fix:**
1. Go to https://nodejs.org/
2. Download the LTS version (recommended)
3. Run the installer
4. **Important:** Make sure to check "Add to PATH" during installation
5. Restart your computer
6. Try running `start.bat` again

**Check if installed:**
- Open Command Prompt
- Type: `node --version`
- If you see a version number (like v18.17.0), Node.js is installed ✅

---

### Error 2: "npm is not installed or not in PATH"

**What you'll see:**
```
ERROR: npm is not installed or not in PATH
```

**What this means:**
- npm is not found on your computer
- npm comes with Node.js, so this usually means Node.js isn't installed properly

**How to fix:**
- Reinstall Node.js from https://nodejs.org/
- Make sure to check "Add to PATH" during installation
- Restart your computer

**Check if installed:**
- Open Command Prompt
- Type: `npm --version`
- If you see a version number, npm is installed ✅

---

### Error 3: "start.bat is not recognized" (PowerShell)

**What you'll see:**
```
start.bat : The term 'start.bat' is not recognized...
Suggestion: If you trust this command, instead type: ".\start.bat"
```

**What this means:**
- You're using PowerShell
- PowerShell requires `.\` before the filename

**How to fix:**
- Use `.\start.bat` instead of `start.bat`
- Or just double-click the file in Windows Explorer (easiest!)

---

### Error 4: "Port 3000 is already in use" or "Port 5000 is already in use"

**What you'll see:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**What this means:**
- Another program is using the same port
- Maybe the servers are already running

**How to fix:**
1. Run `stop.bat` (or `.\stop.bat` in PowerShell) to stop all servers
2. Wait a few seconds
3. Run `start.bat` (or `.\start.bat` in PowerShell) again

**Or manually:**
- Open Task Manager (Ctrl + Shift + Esc)
- Find "Node.js" processes
- End those tasks
- Run `start.bat` again

---

## 🌐 Access the Application

After running `start.bat`:

- **Frontend (Website):** http://localhost:3000
- **Backend (API):** http://localhost:5000

The website will open automatically in your default browser.

---

## 📋 Requirements

**Only one thing is needed on your computer:**

- **Node.js** (version 14 or higher)
  - Download from: https://nodejs.org/
  - Install the LTS version
  - npm comes automatically with Node.js

**That's it!** All project dependencies are already included in the project.

---

## ✅ Quick Checklist

Before running the project:

- [ ] Node.js is installed (check with `node --version` in Command Prompt)
- [ ] No other apps are using ports 3000 or 5000

If both are checked, just run `start.bat` and you're good to go! 🎉

---

## 🆘 Still Having Issues?

1. **Check Node.js is installed:**
   - Open Command Prompt
   - Type: `node --version`
   - Should show a version number (like v18.17.0)

2. **If Node.js is not installed:**
   - Go to https://nodejs.org/
   - Download and install the LTS version
   - Restart your computer
   - Try `start.bat` again

3. **If ports are busy:**
   - Run `stop.bat` first
   - Wait a few seconds
   - Then run `start.bat`

---

## 🎯 Summary

**To Start:**
- **Easiest:** Double-click `start.bat` in Windows Explorer ✅
- **Command Prompt:** Type `start.bat`
- **PowerShell:** Type `.\start.bat` (don't forget the `.\`)

**To Stop:**
- **Easiest:** Double-click `stop.bat` in Windows Explorer ✅
- **Command Prompt:** Type `stop.bat`
- **PowerShell:** Type `.\stop.bat` (don't forget the `.\`)

**If you see errors:**
- Check if Node.js is installed (see Error 1 above)
- Make sure ports 3000 and 5000 are free (run `stop.bat` first)
- If using PowerShell, remember to use `.\start.bat` instead of `start.bat`

**That's it! Simple and easy!** 🚀

---

## 📞 Need Help?

If you continue to have problems:
- Make sure Node.js is installed and added to PATH
- Restart your computer after installing Node.js
- Try running `stop.bat` first, then `start.bat`
