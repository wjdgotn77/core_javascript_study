const addCoffee = name => {
	return prevName => {
		return new Promise(resolve => {
			setTimeout(() => {
				const newName = prevName ? `${prevName}, ${name}` : name;
				console.log(newName);
				resolve(newName);
			}, 500);
		});
	};
};

addCoffee('에스프레소')()
	.then(addCoffee('아메리카노'))
	.then(addCoffee('카페모카'))
	.then(addCoffee('카페라떼')); 