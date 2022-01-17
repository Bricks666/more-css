class Draggable {
	#element;
	#dataType;
	#id;

	constructor(element, dataType, id) {
		this.#element = element;
		this.#dataType = dataType;
		this.#id = id;
	}

	get element() {
		return this.#element;
	}

	get dataType() {
		return this.#dataType;
	}

	subscribe() {
		this.#element.addEventListener("dragstart", this.#onDragStart);
		this.#element.addEventListener("dragend", this.#onDragEnd);
	}

	unsubscribe() {
		this.#element.removeEventListener("dragstart", this.#onDragStart);
		this.#element.removeEventListener("dragend", this.#onDragEnd);
	}

	#onDragStart = (evt) => {
		evt.dataTransfer.clearData();
		evt.dataTransfer.setData("dataType", this.dataType);
		evt.dataTransfer.setData("id", this.#id);
	};

	/* Может стоит добавить картинку перемещения */
	#onDragEnd = (evt) => {
		console.log(evt);
	};
}
