import sublinks from "./data.js";

// ! set const
const toggleBtn = document.querySelector(".toggle-btn");
const closeBtn = document.querySelector(".close-btn");
const sidebarWrapper = document.querySelector(".sidebar-wrapper");
const sidebar = document.querySelector(".sidebar-links");
// *** use spread operator (...) to turn node list to array
const linkBtns = [...document.querySelectorAll(".link-btn")];
const submenu = document.querySelector(".submenu");
const hero = document.querySelector(".hero");
const nav = document.querySelector(".nav");

// ! set hide/show sidebar
toggleBtn.addEventListener("click", () => {
  sidebarWrapper.classList.add("show");
});
closeBtn.addEventListener("click", () => {
  sidebarWrapper.classList.remove("show");
});

// ! set sidebar
// console.table(sublinks);
sidebar.innerHTML = sublinks
  .map((item) => {
    const { page, links } = item;
    return `<article>
  <h4>${page}</h4>
  <div class="sidebar-sublinks">
  ${links
    .map((link) => {
      const { label, icon, url } = link;
      return `<a href="${url}">
      <i class="${icon}"></i>${label}
      </a>`;
    })
    .join("")}
  </div>
  </article>`;
  })
  .join("");

// ! set submenu
linkBtns.forEach((btn) => {
  btn.addEventListener("mouseover", (e) => {
    // console.log(e.currentTarget);
    // *** Return the size of an element and its position relative to the viewport
    const btnInfo = e.currentTarget.getBoundingClientRect();
    // console.log(btnInfo);
    const bottom = btnInfo.bottom - 3;
    const center = (btnInfo.left + btnInfo.right) / 2;
    const text = e.currentTarget.textContent;

    const menuItem = sublinks.find(({ page }) => page === text);

    if (menuItem) {
      const { page, links } = menuItem;
      submenu.style.top = `${bottom}px`;
      submenu.style.left = `${center}px`;
      submenu.classList.add("show");

      // *** optional, change column value according to how many links
      let column = "col-2";
      if (links.length === 3) {
        column = "col-3";
      } else if (links.length > 3) {
        column = "col-4";
      }

      submenu.innerHTML = `
      <section>
      <h4>${page}</h4>
      <div class="submenu-center ${column}">
      ${links
        .map((link) => {
          return `<a href="${link.url}">
        <i class="${link.icon}"></i> ${link.label}
        </a>`;
        })
        .join("")}
      </div>
      </section>
      `;
    }
  });
});

// ! remove submenu
hero.addEventListener("mouseover", function () {
  submenu.classList.remove("show");
});

nav.addEventListener("mouseover", function (e) {
  if (!e.target.classList.contains("link-btn")) {
    submenu.classList.remove("show");
  }
});
