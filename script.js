// Adjustable limit
const LIMIT = 94;

// DOM refs
const container = document.getElementById("runsContainer");
const addBtn = document.getElementById("addRun");
const globalPointsCounter = document.getElementById("globalPoints");

// Data tables
const stageBasePoints = [10, 12, 14, 16, 18];
const valuePoints = [5, 4, 3, 2, 1, 1, 1, 1, 0, 0];

// Update displayed limit
globalPointsCounter.innerHTML = `Total: 0<small>/${LIMIT}</small>`;

// Create dropdown 1–10
function createDropdown() {
  const select = document.createElement("select");
  for (let i = 1; i <= 10; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    select.appendChild(option);
  }
  return select;
}

// Add a run row
function addRunRow() {
  const row = document.createElement("div");
  row.className = "run";

  const dropdowns = [];

  for (let i = 0; i < 5; i++) {
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";
    wrapper.style.alignItems = "center";
    wrapper.style.gap = "6px";

    const dd = createDropdown();
    if (i !== 0) dd.disabled = true;
    wrapper.appendChild(dd);

    const toggleOne = document.createElement("input");
    toggleOne.type = "checkbox";
    toggleOne.checked = !dd.disabled;
    toggleOne.onchange = () => {
      dd.disabled = !toggleOne.checked;
      updateAllWaffles();
    };
    wrapper.appendChild(toggleOne);

    dd.onchange = updateAllWaffles;

    dropdowns.push(dd);
    row.appendChild(wrapper);
  }

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.textContent = "Remove";
  Object.assign(removeBtn.style, {
    background: "#e84118",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "8px 12px",
    cursor: "pointer",
  });
  removeBtn.onclick = () => {
    row.remove();
    updateAllWaffles();
  };
  row.appendChild(removeBtn);

  const wafflesCounter = document.createElement("div");
  wafflesCounter.className = "waffles";
  wafflesCounter.textContent = "Waffles: 0";
  row.appendChild(wafflesCounter);

  container.appendChild(row);
  updateAllWaffles();
}

// Calculate totals
function updateAllWaffles() {
  let grandTotal = 0;
  const runs = container.querySelectorAll(".run");

  runs.forEach((r) => {
    const wafflesDiv = r.querySelector(".waffles");
    const dropdowns = Array.from(r.querySelectorAll("select"));

    let runTotal = 0;

    dropdowns.forEach((dd, idx) => {
      if (!dd.disabled) {
        const placement = parseInt(dd.value);
        const base = placement <= 4 ? stageBasePoints[idx] : 0;
        runTotal += base + valuePoints[placement - 1];
      }
    });

    wafflesDiv.textContent = "Waffles: " + runTotal;
    grandTotal += runTotal;
  });

  globalPointsCounter.innerHTML = `Total: ${grandTotal}<small>/${LIMIT}</small>`;
  globalPointsCounter.classList.toggle("over", grandTotal > LIMIT);
}

addBtn.addEventListener("click", addRunRow);
