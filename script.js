function classifyWaste() {
  let input = document.getElementById("wasteInput").value.toLowerCase();
  let result = document.getElementById("result");

  for (let item of wasteData) {
    for (let key of item.keywords) {
      if (input.includes(key)) {

        saveStatistic(item.type);

        result.innerHTML = `
          <h3>KẾT QUẢ PHÂN TÍCH</h3>
          <b>Phân loại:</b> ${item.type}<br><br>
          <b>♻️ Gợi ý tái sử dụng:</b> ${item.reuse}<br><br>
          <b>⚠️ Giải pháp xử lý:</b> ${item.solution}
        `;
        return;
      }
    }
  }

  result.innerHTML = "❓ Chưa nhận diện được loại rác này. Cần bổ sung dữ liệu.";
}

// ====== THỐNG KÊ ======
function saveStatistic(type) {
  let stats = JSON.parse(localStorage.getItem("wasteStats")) || {};
  stats[type] = (stats[type] || 0) + 1;
  localStorage.setItem("wasteStats", JSON.stringify(stats));
}

function showReport() {
  let stats = JSON.parse(localStorage.getItem("wasteStats"));
  let report = document.getElementById("report");

  if (!stats) {
    report.innerHTML = "📉 Chưa có dữ liệu thống kê.";
    return;
  }

  let html = "<h3>📊 BÁO CÁO MÔI TRƯỜNG</h3>";
  for (let key in stats) {
    html += `${key}: ${stats[key]}<br>`;
  }

  report.innerHTML = html;
}
