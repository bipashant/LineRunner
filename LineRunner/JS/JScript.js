getRandomArbitrary = function () {
    console.log(Math.random() * 2);



    var mainloop = requestAnimationFrame(getRandomArbitrary());

};

getRandomArbitrary();