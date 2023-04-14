console.log("hello wolrd")

const btn = document.querySelector(".btn");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");
btn.addEventListener("click", () => {
    if (form.classList.contains("hidden")) {
        form.classList.remove("hidden");
        btn.innerHTML = "close"
    } else {
        form.classList.add("hidden")
        btn.innerHTML = "Share a fact"
    }
});

const CATEGORIES = [
    { name: "technology", color: "#3b82f6" },
    { name: "science", color: "#16a34a" },
    { name: "finance", color: "#ef4444" },
    { name: "society", color: "#eab308" },
    { name: "entertainment", color: "#db2777" },
    { name: "health", color: "#14b8a6" },
    { name: "history", color: "#f97316" },
    { name: "news", color: "#8b5cf6" },
];



function createFactsList(dataArray) {
    const htmlarr = dataArray.map((fact) => `<li class ="fact">
    <p>
    ${fact.Contains}
    <a class = "source"
    href = "${fact.source}"
    target = "_blank"
    >(source)</a>
    </p>
    <span class="tag" style="background-color: ${CATEGORIES.find((cat) => cat.name === fact.category).color}"> ${fact.category}</span>
    </li>`);
    const joi = htmlarr.join("")
    factsList.insertAdjacentHTML("afterbegin", joi);
}

fact();
async function fact() {
    const res = await fetch("https://ynqmownzhgfpnffdwhjc.supabase.co/rest/v1/data",
        {
            headers: {
                apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlucW1vd256aGdmcG5mZmR3aGpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwMjM5MjcsImV4cCI6MTk5NjU5OTkyN30.c5k0kt8MxC8BQrB6kb1YaDsh6aUNh3u_Lw8hfUtGXLQ",
                authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlucW1vd256aGdmcG5mZmR3aGpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwMjM5MjcsImV4cCI6MTk5NjU5OTkyN30.c5k0kt8MxC8BQrB6kb1YaDsh6aUNh3u_Lw8hfUtGXLQ",
            },
        }
    );

    const data = await res.json();
    console.log(data);
    createFactsList(data);
}

