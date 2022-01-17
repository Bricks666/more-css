class Dropzone {
	#element = {};
	#observableDataType = "";
	#getDraggableElement;
	#onDropCallback;

	constructor(element, observableDataType, getDraggableElement, addOptions) {
		if (
			element === undefined ||
			observableDataType === undefined ||
			typeof getDraggableElement !== "function"
		) {
			throw new Error("Keep require argument");
		}

		this.#element = element;
		this.#observableDataType = observableDataType;
		this.#getDraggableElement = getDraggableElement;
		this.#onDropCallback = addOptions?.onDrop || (() => {});
	}

	get element() {
		return this.#element;
	}

	get observableDataType() {
		return this.#observableDataType;
	}

	subscribe() {
		this.element.addEventListener("dragover", this.#onDragOver);
		this.element.addEventListener("drop", this.#onDrop);
	}

	unsubscribe() {
		this.element.removeEventListener("dragover", this.#onDragOver);
		this.element.removeEventListener("drop", this.#onDrop);
	}

	#idObservableType(type) {
		return (
			this.#observableDataType === "all" || type === this.#observableDataType
		);
	}

	#onDragOver = (evt) => {
		evt.preventDefault();
	};

	#onDrop = (evt) => {
		const dataType = evt.dataTransfer.getData("dataType");
		if (this.#idObservableType(dataType)) {
			const draggable = this.#getDraggableElement(
				evt.dataTransfer.getData("id")
			);

			if (this.#element.children.length) {
				this.#element.append("\t");
			}
			draggable.element.remove();
			this.#element.append(draggable.element);
			this.#onDropCallback(this, draggable);
		}
	};
}
