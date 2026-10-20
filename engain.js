(function() {
    // ১. পাসওয়ার্ড ভেরিফিকেশন
    var userPassword = prompt("Enter Password to Access TBS Engine:");

    if (userPassword !== "TBS1") {
        alert("❌ Wrong Password! Access Denied.");
        return;
    }

    alert("✅ Access Granted! TBS Engine Initializing...");

    // ২. আগের UI থাকলে তা রিমুভ করা
    var oldBot = document.getElementById('tbs-bot-ui');
    if (oldBot) oldBot.remove();

    // ৩. বট UI কন্টেইনার তৈরি
    var botContainer = document.createElement('div');
    botContainer.id = 'tbs-bot-ui';
    botContainer.style.cssText = `
        position: fixed;
        top: 20%;
        left: 20px;
        width: 310px;
        background-color: #07121e;
        background-image: linear-gradient(rgba(0, 150, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 150, 255, 0.05) 1px, transparent 1px);
        background-size: 15px 15px;
        color: #ffffff;
        border: 1px solid #1a324b;
        border-radius: 12px;
        padding: 14px;
        z-index: 999999;
        font-family: 'Segoe UI', sans-serif;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
    `;

    // ৪. UI স্ট্রাকচার
    botContainer.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid #162a3d;">
            <strong style="color: #00b0ff; font-size: 14px;">TBS TRADERS BD ENGINE</strong>
            <span id="tbs-close-btn" style="color: #ff5252; cursor: pointer; font-weight: bold;">✕</span>
        </div>

        <div style="font-size: 11px;">
            <div style="margin-bottom: 8px; color: #4a6885;">STATUS: <strong id="tbs-status" style="color: #00e676;">STANDBY</strong></div>
            <div style="margin-bottom: 8px; color: #4a6885;">TIMER: <strong id="tbs-timer" style="color: #ffb703;">00:06</strong></div>
            
            <button id="tbs-trigger-btn" style="width: 100%; background: #0088cc; color: white; border: none; padding: 10px; border-radius: 6px; font-weight: bold; cursor: pointer; margin-top: 10px;">
                EXECUTE AUTO-INTERCEPT
            </button>
        </div>
    `;

    document.body.appendChild(botContainer);

    // ৫. অটোমেটিক অ্যাকশন এবং কাউন্টডাউন স্ক্রিপ্ট
    var isRunning = false;
    document.getElementById('tbs-trigger-btn').onclick = function() {
        if (isRunning) return;
        isRunning = true;
        
        var statusElem = document.getElementById('tbs-status');
        var timerElem = document.getElementById('tbs-timer');
        statusElem.innerText = "RUNNING ANALYSIS...";
        statusElem.style.color = "#ffb703";

        var count = 5;
        var interval = setInterval(function() {
            timerElem.innerText = "00:0" + count;
            count--;

            if (count < 0) {
                clearInterval(interval);
                timerElem.innerText = "00:00";
                statusElem.innerText = "SIGNAL TRIGGERED!";
                statusElem.style.color = "#00e676";

                // পেজের আসল ট্রেড বোতাম বা যেকোনো ইনপুট অটোক্লিক করার চেষ্টা
                var buyButton = document.querySelector('.btn-call') || document.querySelector('button[class*="buy"]');
                if (buyButton) {
                    buyButton.click(); // অটো ক্লিক অ্যাকশন
                    alert("TBS Engine executed auto-click on Call/Buy button!");
                } else {
                    alert("Signal Complete! (No trade button target found on page)");
                }

                isRunning = false;
            }
        }, 1000);
    };

    document.getElementById('tbs-close-btn').onclick = function() {
        botContainer.remove();
    };
})();
