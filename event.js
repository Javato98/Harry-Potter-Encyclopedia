function tDdropdown() {
    // Todo el código que depende del DOM va aquí
    const classAttributeName = document.querySelector(".attribute-name");
    const dropdown = document.querySelector(".dropdown");
  
    classAttributeName.addEventListener("click", () => {
      if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
      } else {
        dropdown.style.display = "block";
      }
    });
  };
  
