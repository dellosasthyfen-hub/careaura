const faqs = [
  { q: "what services do you offer", a: "We connect you with certified professionals offering home-based wellness and grooming services including massages, haircuts, and manicures." },
  { q: "how do i book a service", a: "Visit our booking page and choose your preferred professional, date, time, and service." },
  { q: "do i need to prepare anything before the service", a: "Please provide a clean and comfortable space where the service can be performed." },
  { q: "what are your operating hours", a: "Our partnered professionals are available daily from 8:00 AM to 8:00 PM depending on their schedules." },
  { q: "how do i pay", a: "You can pay through GCash or cash after the service is completed." },
  { q: "can i cancel my booking", a: "Yes. You can cancel anytime the scheduled appointment without charges." },
  { q: "are the professionals certified", a: "Yes. We only partner with verified and certified wellness and grooming professionals." },
  { q: "do you accept group bookings", a: "Yes, group and event bookings are available depending on professional availability." },
  { q: "is the service safe and hygienic", a: "Our partnered professionals follow strict sanitation practices and bring properly sanitized tools to every appointment." },
  { q: "can i choose a male or female professional", a: "Yes. You may select your preferred professional based on availability in your area." },
  { q: "is there an additional travel fee", a: "Some professionals may charge a small travel fee depending on your location, and this will be shown before confirming your booking." },
  { q: "can i request the same professional again", a: "Yes. If the professional is available, you can rebook with them for future sessions." },
  { q: "how long does a service usually take", a: "Duration varies per service, usually between 45 minutes to 2 hours depending on the treatment." },
  { q: "do you offer services in all locations", a: "Availability depends on whether a verified professional is active in your area." },
  { q: "what if the professional arrives late", a: "If delays occur, you will be notified and you may request a reschedule if necessary." }
];
const questionInput = document.getElementById("questionInput");
const output = document.getElementById("searchAnswer");

function searchFaq(auto = false) {
  // get input, lowercase, trim, remove punctuation
  const question = questionInput.value
    .toLowerCase()
    .trim()
    .replace(/[?.,!]/g, ""); // remove ? . , !

  if (auto && question === "") {
    output.textContent = "";
    return;
  }
  
  if (question === "") {
    output.textContent = "Please type your question first.";
    return;
  }

  const keywords = question
    .split(" ")
    .filter(word => word.length > 2)
    .map(word => word.replace(/s$/, "")); // remove trailing 's'

  const matches = [];

  faqs.forEach(faq => {
    const faqWords = faq.q
      .toLowerCase()
      .replace(/[?.,!]/g, "")
      .split(" ")
      .map(word => word.replace(/s$/, "")); // remove trailing 's'

    let score = 0;
    keywords.forEach(kw => {
      if (faqWords.includes(kw)) {
        score++;
      }
    });

    if (score > 0) {
      matches.push({ faq, score });
    }
  });

  // sort descending by score
  matches.sort((a, b) => b.score - a.score);

  let selectedFaq = null;
  if (matches.length >= 2) {
    selectedFaq = matches[1].faq; // choose second best
  } else if (matches.length === 1) {
    selectedFaq = matches[0].faq; // only one match
  }

  if (selectedFaq) {
    output.textContent = "Answer: " + selectedFaq.a;
  } else if (!auto) {
    output.textContent = "Sorry, the question is not found in our FAQs.";
  } else {
    output.textContent = "";
  }
}



// clear output on click
questionInput.addEventListener("click", function() {
  output.textContent = "";
});

// enter to confirm search
questionInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchFaq();
  } else if (event.key === "Backspace") {
    output.textContent = "";
  }
});

function loadFaqs() {
  const faqAccordion = document.getElementById("faqAccordion");

  faqs.forEach((item, index) => {
    const faqItem = document.createElement("div");
    faqItem.classList.add("accordion-item");

    faqItem.innerHTML = `
      <h2 class="accordion-header" id="heading${index}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
          data-bs-target="#collapse${index}">
          ${item.q.charAt(0).toUpperCase() + item.q.slice(1)}?
        </button>
      </h2>
      <div id="collapse${index}" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          ${item.a}
        </div>
      </div>
    `;

    faqAccordion.appendChild(faqItem);
  });
}

// load FAQs when page opens
document.addEventListener("DOMContentLoaded", loadFaqs);