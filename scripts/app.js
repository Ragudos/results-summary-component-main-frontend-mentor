const data = await fetch(location.origin + "/data.json", {
    headers: {
        "Content-Type": "application/json"
    },
    method: "GET"
});
const json = await data.json();
const averageScore = Math.floor((json.reduce((prev, curr) => {
    return prev + curr.score;
}, 0)) / json.length);

console.log(json);

const avgScore = document.getElementById("avg-score");

if (avgScore) {
    avgScore.textContent = averageScore + "";
}

console.log(json);

const classListPerCategory = {
    Reaction: {
        color: "text-primary-light-red",
        backgroundColor: "bg-primary-light-red"
    },
    Memory: {
        color: "text-primary-orange-yellow",
        backgroundColor: "bg-primary-orange-yellow"
    },
    Verbal: {
        color: "text-primary-green-teal",
        backgroundColor: "bg-primary-green-teal",
    },
    Visual: {
        color: "text-primary-cobalt-blue",
        backgroundColor: "bg-primary-cobalt-blue",
    }
}

const section = document.getElementById("section-of-summary");

if (section) {

    json.forEach((data) => {
        const card = document.createElement("div");

        card.classList.add("summary-list-card", classListPerCategory[data.category].backgroundColor, "flex", "justify-between", "items-center");
        card.style.setProperty("--_bg-opacity", "0.075");

        const dataTitle = document.createElement("div");

        dataTitle.classList.add(classListPerCategory[data.category].color, "flex", "gap-half", "items-center");

        const image = new Image();
        image.src = data.icon;
        image.alt = data.category + " icon";
        image.width = "24";
        image.height = "24";

        const dataTitleText = document.createElement("div");
        const strong = document.createElement("strong");

        strong.textContent = data.category;
        dataTitleText.append(strong);

        dataTitle.append(image);
        dataTitle.append(dataTitleText);

        const scoreContainer = document.createElement("div");
        const score = document.createElement("div");
        const slantedLine = document.createElement("span");
        const totalScore = document.createElement("div");

        scoreContainer.classList.add("flex", "gap-half", "items-center");
        score.textContent = data.score;

        slantedLine.classList.add("slanted-line");

        totalScore.textContent = "100";
        totalScore.classList.add("text-dark-gray-blue");
        totalScore.style.setProperty("--_text-opacity", "0.75");

        scoreContainer.append(score);
        scoreContainer.append(slantedLine);
        scoreContainer.append(totalScore);

        card.append(dataTitle);
        card.append(scoreContainer);

        section.append(card);
    });
}
