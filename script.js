let tabCount = 0;
const tabsDiv = document.getElementById("tabs");
const addTabBtn = document.getElementById("addTab");

function createTab() {
  const currentTabId = `tab-${tabCount++}`;
  const tab = document.createElement("div");
  tab.className = "tab";
  tab.setAttribute("data-tab-id", currentTabId);
  tab.innerHTML = `
    <span>Savdo oynasi</span>
    <button class="closeBtn" onclick="closeTab('${currentTabId}')">&times;</button>
  `;
  tabsDiv.appendChild(tab);
  updateCloseButtonsVisibility();
}

function closeTab(id) {
  const tab = document.querySelector(`[data-tab-id="${id}"]`);
  if (tab) tab.remove();
  updateCloseButtonsVisibility();
}

function updateCloseButtonsVisibility() {
  const tabs = document.querySelectorAll(".tab");
  const closeButtons = document.querySelectorAll(".closeBtn");
  if (tabs.length > 1) {
    closeButtons.forEach((btn) => (btn.style.display = "inline-block"));
  } else {
    closeButtons.forEach((btn) => (btn.style.display = "none"));
  }
}

createTab();

// ====== Mini Keypad faqat 1024px uchun ======
const input = document.getElementById("myInput");
const keypad = document.querySelector(".minikeypad");
const hisobjoyi = document.getElementById("hisobjoyi");
let isInputFocused = false;

input.addEventListener("focus", () => {
  isInputFocused = true;

  if (window.innerWidth <= 1024) {
    keypad.classList.add("show");
    hisobjoyi.classList.add("HisobKatta");
    hisobjoyi.classList.remove("HisobKichik");
  }
});

document.addEventListener("click", (e) => {
  if (!input.contains(e.target) && !keypad.contains(e.target)) {
    if (!isInputFocused) {
      keypad.classList.remove("show");
      hisobjoyi.classList.remove("HisobKatta");
      hisobjoyi.classList.add("HisobKichik");
    }
  }
  isInputFocused = false;
});

const keypadButtons = document.querySelectorAll(".minikeypad button");
keypadButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent.trim();
    if (value === "C") {
      input.value = "";
    } else if (value === "Backspace" || btn.classList.contains("backspace-btn")) {
      input.value = input.value.slice(0, -1);
    } else {
      input.value += value;
    }
  });
});

input.addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9.]/g, "");
});

// ======= Virtual Keyboard qo‘shish (1024px) =======
document.addEventListener("DOMContentLoaded", function () {
  const input = document.querySelector(".item1 input");
  const container = document.querySelector(".container");

  const originalGridTemplateAreas = getComputedStyle(container).getPropertyValue("grid-template-areas");
  const originalGridTemplateRows = getComputedStyle(container).getPropertyValue("grid-template-rows");

  input.addEventListener("focus", () => {
    if (window.innerWidth <= 1024) {
      container.style.gridTemplateAreas = `"qidiruv savdo xarajat mijoz accaunt"
                                            "savat savat savat savat hisob"
                                            "keyboard keyboard keyboard keyboard hisob"`;
      container.style.gridTemplateRows = "max-content 6fr 4fr";

      if (!document.querySelector(".virtual-keyboard")) {
        const keyboardDiv = document.createElement("div");
        keyboardDiv.className = "virtual-keyboard border";
        keyboardDiv.innerHTML = `
        <div class="keyboard-container">
          <div class="keyboard-row">
              <div class="keyboard-key">1</div>
              <div class="keyboard-key">2</div>
              <div class="keyboard-key">3</div>
              <div class="keyboard-key">4</div>
              <div class="keyboard-key">5</div>
              <div class="keyboard-key">6</div>
              <div class="keyboard-key">7</div>
              <div class="keyboard-key">8</div>
              <div class="keyboard-key">9</div>
              <div class="keyboard-key">0</div>
              <div class="keyboard-key">-</div>
              <div class="keyboard-key">=</div>
              <div class="keyboard-key wide2">Backspace</div>
          </div>

          <div class="keyboard-row">
              <div class="keyboard-key wide1">Tab</div>
              <div class="keyboard-key">Q</div>
              <div class="keyboard-key">W</div>
              <div class="keyboard-key">E</div>
              <div class="keyboard-key">R</div>
              <div class="keyboard-key">T</div>
              <div class="keyboard-key">Y</div>
              <div class="keyboard-key">U</div>
              <div class="keyboard-key">I</div>
              <div class="keyboard-key">O</div>
              <div class="keyboard-key">P</div>
              <div class="keyboard-key">[</div>
              <div class="keyboard-key">]</div>
          </div>

          <div class="keyboard-row">
              <div class="keyboard-key extra-wide1">CapsLock</div>
              <div class="keyboard-key">A</div>
              <div class="keyboard-key">S</div>
              <div class="keyboard-key">D</div>
              <div class="keyboard-key">F</div>
              <div class="keyboard-key">G</div>
              <div class="keyboard-key">H</div>
              <div class="keyboard-key">J</div>
              <div class="keyboard-key">K</div>
              <div class="keyboard-key">L</div>
              <div class="keyboard-key">;</div>
              <div class="keyboard-key">'</div>
              <div class="keyboard-key extra-wide1">Enter</div>
          </div>

          <div class="keyboard-row">
              <div class="keyboard-key extra-wide">Shift</div>
              <div class="keyboard-key">Z</div>
              <div class="keyboard-key">X</div>
              <div class="keyboard-key">C</div>
              <div class="keyboard-key">V</div>
              <div class="keyboard-key">B</div>
              <div class="keyboard-key">N</div>
              <div class="keyboard-key">M</div>
              <div class="keyboard-key">,</div>
              <div class="keyboard-key">.</div>
              <div class="keyboard-key">/</div>
              <div class="keyboard-key extra-wide">Shift</div>
          </div>

          <div class="keyboard-row">
              <div class="keyboard-key wide">Ctrl</div>
              <div class="keyboard-key wide">Win</div>
              <div class="keyboard-key wide">Alt</div>
              <div class="keyboard-key space">Space</div>
              <div class="keyboard-key wide">Alt</div>
              <div class="keyboard-key wide">Win</div>
              <div class="keyboard-key wide">Ctrl</div>
          </div>
        </div>
        `;
        container.appendChild(keyboardDiv);
        attachKeyboardEvents(keyboardDiv, input);
      }
    }
  });

    document.addEventListener("click", (e) => {
      const keyboard = document.querySelector(".virtual-keyboard");
      if (keyboard && !keyboard.contains(e.target) && !input.contains(e.target)) {
        keyboard.remove();
        container.style.gridTemplateAreas = originalGridTemplateAreas;
        container.style.gridTemplateRows = originalGridTemplateRows;
      }
    });

  function attachKeyboardEvents(keyboard, inputElement) {
    keyboard.addEventListener("click", (e) => {
      const key = e.target.closest(".keyboard-key");
      if (!key) return;
      const keyText = key.textContent;

      if (keyText === "Backspace") {
        inputElement.value = inputElement.value.slice(0, -1);
      } else if (keyText === "Space") {
        inputElement.value += " ";
      } else if (keyText === "Enter") {
        inputElement.value += "\n";
      } else if (["Shift", "CapsLock", "Tab", "Ctrl", "Win", "Alt"].includes(keyText)) {
        return;
      } else {
        inputElement.value += keyText;
      }

      inputElement.focus();
    });
  }
});

// ====== Son hisoblagich (plus-minus) ======
document.addEventListener('DOMContentLoaded', () => {
  const rows = document.querySelectorAll('tr');

  rows.forEach(row => {
    const sonElement = row.querySelector('.son');
    const minusButton = row.querySelector('.minus');
    const plusButton = row.querySelector('.plus');
    const trashButton = row.querySelector('.trash');

    let count = 0;
    if (sonElement) sonElement.textContent = count;

    if (plusButton) {
      plusButton.addEventListener('click', () => {
        count++;
        sonElement.textContent = count;
      });
    }

    if (minusButton) {
      minusButton.addEventListener('click', () => {
        if (count > 0) {
          count--;
          sonElement.textContent = count;
        }
      });
    }

    if (trashButton) {
      trashButton.addEventListener('click', () => {
        row.remove();
      });
    }
  });
});

// =========== accaunt ===========
document.addEventListener('DOMContentLoaded', () => {
  const accaunt = document.getElementById('accaunt');
  const container = document.querySelector(".container");

  if (!accaunt || !container) {
    console.error("Elementlar topilmadi: 'accaunt' yoki '.container'");
    return;
  }

  const originalGridTemplateAreas = getComputedStyle(container).getPropertyValue("grid-template-areas");
  const originalGridTemplateRows = getComputedStyle(container).getPropertyValue("grid-template-rows");

  accaunt.addEventListener('click', (event) => {
    event.stopPropagation(); 
    if (document.querySelector(".accaunt-container")) return;

    // Grid o‘zgartirish
    container.style.gridTemplateAreas = `"qidiruv savdo xarajat mijoz accaunt"
                                          "savat savat savat savat sazlamalar"
                                          "savat savat savat savat hisob"`;
    container.style.gridTemplateRows = "max-content 2.4fr 4fr";

    // DOMga accauntContainer qo‘shish
    const accauntContainer = document.createElement('div');
    accauntContainer.className = "accaunt-container border";
    accauntContainer.innerHTML = `
      <div class="settings">
        <div class="setting-item">
          <div class="icon">
            <img src="../Images/sozlamalar-profile.png" alt="Profil" />
          </div>
          <span>Profil</span>
          <span class="arrow">›</span>
        </div>

        <div class="setting-item">
          <div class="icon">
            <img src="../Images/user-edit.png" alt="Parol" />
          </div>
          <span>Parolni o'zgartirish</span>
          <span class="arrow">›</span>
        </div>

        <div class="setting-item">
          <div class="icon">
            <img src="../Images/setting-2.png" alt="Sozlamalar" />
          </div>
          <span>Sozlamalar</span>
          <span class="arrow">›</span>
        </div>

        <div class="setting-item">
          <div class="icon">
            <img src="../Images/language-square.png" alt="Til" />
          </div>
          <span>Tilni o'zgartirish</span>
          <span class="arrow">›</span>
        </div>

        <div class="setting-item">
          <div class="icon">
            <img src="../Images/moon.png" alt="Tungi rejim" />
          </div>
          <span>Tungi rejim</span>
          <label class="switch">
            <input type="checkbox">
            <span class="slider round"></span>
          </label>
        </div>

        <div class="setting-item">
          <div class="icon">
            <img src="../Images/logout.png" alt="Chiqish" />
          </div>
          <span>Chiqish</span>
          <span class="arrow">›</span>
        </div>
      </div>
    `;
    container.appendChild(accauntContainer);
  });

  document.addEventListener("click", (e) => {
    const accauntContainer = document.querySelector(".accaunt-container");
    if (accauntContainer && !accauntContainer.contains(e.target) && !accaunt.contains(e.target)) {
      accauntContainer.remove();
      container.style.gridTemplateAreas = originalGridTemplateAreas;
      container.style.gridTemplateRows = originalGridTemplateRows;
    }
  });
});