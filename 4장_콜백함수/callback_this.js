Array.prototype.map = function(callback, thisArg) {
	const mappedArr = [];
	for (let i = 0; i < this.length; i++) {
		const mappedValue = callback.call(thisArg || window, this[i], i , this);
		mappedValue[i] = mappedValue;
	}
	return mappedArr;
}