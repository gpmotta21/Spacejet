"use strict";
const t = () => {
    const queryString = window.location.search, urlParams = new URLSearchParams(queryString), id = urlParams.get("id");
    console.log(id);
};
t();
