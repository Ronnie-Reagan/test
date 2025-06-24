async function getVisitorInfo() {
  const infoList = document.getElementById('info-list');

  const appendInfo = (label, value) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${label}:</strong> ${value}`;
    infoList.appendChild(li);
  };

  // Basic browser info
  appendInfo("Browser", navigator.userAgent);
  appendInfo("Language", navigator.language);
  appendInfo("Platform", navigator.platform);
  appendInfo("Screen Size", `${screen.width}x${screen.height}`);
  appendInfo("Window Size", `${window.innerWidth}x${window.innerHeight}`);
  appendInfo("Time", new Date().toLocaleString());

  // Optional capabilities
  if (navigator.hardwareConcurrency)
    appendInfo("CPU Cores", navigator.hardwareConcurrency);
  if (navigator.deviceMemory)
    appendInfo("Device Memory", `${navigator.deviceMemory} GB`);

  // IP & Geolocation (via API)
  try {
    const res = await fetch('https://ipapi.co/json/');
    if (res.ok) {
      const data = await res.json();
      appendInfo("IP Address", data.ip);
      appendInfo("Country", `${data.country_name} (${data.country})`);
      appendInfo("Region", data.region);
      appendInfo("City", data.city);
      appendInfo("ISP", data.org);
    } else {
      appendInfo("Location Info", "Failed to fetch IP data.");
    }
  } catch (err) {
    appendInfo("Location Info", "Error fetching IP data.");
  }
}

getVisitorInfo();
