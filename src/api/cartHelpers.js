export const addTicket = (items = [], next = (f) => f) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...items,
    });

    // remove duplicates
    // build an Array from new Set and turn it back into array using Array.from
    // so that later we can re-map it
    // new set will only allow unique values in it
    // so pass the ids of each object/product
    // If the loop tries to add the same value again, it'll get ignored
    // ...with the array of ids we got on when first map() was used
    // run map() on it again and return the actual product from the cart

    // cart = Array.from(new Set(cart.map((p) => p._id))).map((id) => {
    //   return cart.find((p) => p._id === id);
    // });

    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const setCity = (c = [], next = (f) => f) => {
  let city = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("city")) {
      city = JSON.parse(localStorage.getItem("city"));
    }
    city.push({
      c,
    });

    localStorage.setItem("city", JSON.stringify(city));
    next();
  }
};

export const getCity = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("city")) {
      return JSON.parse(localStorage.getItem("city"));
    }
  }
  return [];
};

export const removeCity = (cityName) => {
  let city = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("city")) {
      city = JSON.parse(localStorage.getItem("city"));
    }

    if (city.length > 1) {
      let remove = city.filter((e) => e.c === cityName);
      remove.forEach((f) =>
        city.splice(
          city.findIndex((e) => e.seatNumber === f.seatNumber),
          1
        )
      );
    }

    localStorage.setItem("city", JSON.stringify(city));
  }
  return city;
};

export const itemTotal = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")).length;
    }
  }
  return 0;
};

export const getCart = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
  return [];
};

export const updateTicket = (movieId, type) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((movie, i) => {
      if (movie._id === movieId) {
        cart[i].type = type;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const removeTicket = (movieId, seatNumber) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((movie, i) => {
      if (movie._id === movieId) {
        let remove = cart.filter((e) => e.seatNumber === seatNumber);
        remove.forEach((f) =>
          cart.splice(
            cart.findIndex((e) => e.seatNumber === f.seatNumber),
            1
          )
        );
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

export const emptyCart = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart");
    next();
  }
};
