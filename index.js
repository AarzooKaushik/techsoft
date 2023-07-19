///// variables

const navList = document.querySelector(".navlist");
const allSections = document.querySelectorAll("section");
const testimonial = document.querySelector(".testimonials");
const slidesTestimonials = document.querySelectorAll(
  ".testimonial-content-inner"
);
const dots = document.querySelectorAll(".dot");
const menuButton = document.querySelector(".menu-bar");
const hideMenu = document.querySelector(".hide-menu");

//////////////////////////////////////////////////////
/////////////////// sticky navbar  ///////////////////
//////////////////////////////////////////////////////

function windowScroll() {
  const navbar = document.querySelector(".navbar");
  if (
    document.body.scrollTop >= 50 ||
    document.documentElement.scrollTop >= 50
  ) {
    navbar.classList.add("nav-sticky");
  } else {
    navbar.classList.remove("nav-sticky");
  }
}

window.addEventListener("scroll", (ev) => {
  ev.preventDefault();
  windowScroll();
});

/////////////////////////////////////////
//*********** Testimonials  ***********
/////////////////////////////////////////

let curSlide = 0;
let maxSlide = slidesTestimonials.length;

const goToSlide = (slideIndex) => {
  slidesTestimonials.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - slideIndex)}%)`;
    dots.forEach((dot) => {
      dot.classList.remove("active-dot");
    });

    const activeDot = dots[slideIndex];
    activeDot.classList.add("active-dot");
  });
};
goToSlide(1);

dots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    const index = Array.from(dots).indexOf(e.target);
    goToSlide(index);
  });
});

const nextSlide = () => {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};
const previousSlide = () => {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};

let interval = setInterval(nextSlide, 5000);

/////////////////////////////////////////
//********* mobile navigation ***********
/////////////////////////////////////////

menuButton.addEventListener("click", () => {
  navList.classList.add("nav-open");
  menuButton.style.display = "none";

  hideMenu.style.display = "block";
});

hideMenu.addEventListener("click", () => {
  navList.classList.remove("nav-open");
  hideMenu.style.display = "none";
  menuButton.style.display = "block";
});
/////////////////////////////////////////
//*********** form validation ***********
/////////////////////////////////////////

const form = document.querySelector(".contact-form");
const username = document.querySelector("#username");
const number = document.querySelector("#number");
const email = document.querySelector("#email");

function isemail(email) {
  return /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(
    email
  );
}

const validate = {
  username: (value) => {
    if (!value) {
      return "Required !";
    }
    return null;
  },

  email: (value) => {
    if (!value) {
      return "Required !";
    }
    if (!isemail(value)) {
      return "invalid email !";
    }
    return null;
  },

  number: (value) => {
    if (!value) {
      return "required !";
    }
    return null;
  },
};

const setError = (selector, key) => {
  const span = document.querySelector(`#${selector}`);
  span.previousElementSibling.innerText = validate[selector](key);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let tempObj = {
    username: username.value,
    number: number.value,
    email: email.value,
  };

  let hasError = false;

  Object.keys(validate).forEach((item) => {
    setError(item, tempObj[item]);
    if (validate[item](tempObj[item])) {
      hasError = true;
    }
  });

  Object.keys(tempObj).forEach((key) => {
    const node = document.querySelector(`#${key}`);
    node.addEventListener("change", (e) => {
      setError(key, e.target.value);
    });
  });

  if (!hasError) {
    form.reset();
    alert("form submitted");
  }
});
