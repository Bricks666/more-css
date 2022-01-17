class CodeChange {
	#element;
	#observer;
	#config = {
		attributes: false,
		childList: true,
		subtree: true,
	};
	#example;
	#childCount;
	#property = {
		name: "",
		value: "",
	};

	constructor(codeBox, example) {
		this.#element = codeBox;
		this.#example = example;
		this.#observer = new CodeChangeObserver(
			this.#element,
			this.#config,
			this.#onMutation
		);
    console.log(codeBox)
		this.#childCount = codeBox.children.length
		this.#observer.observe();
	}

	#isSelector(selector) {
		return this.#element.style[selector] !== undefined;
	}

	#getSelectorAndValue() {
		const selectorAndValueNoValid = this.#element.textContent.replaceAll(
			"\n",
			""
		);
		const pair = selectorAndValueNoValid.trim().replaceAll(" ", "").split(":");

		return pair;
	}

	#onMutation = ([mutation]) => {
		const isAdded = !!mutation.addedNodes.length;
		const isRemoved = !!mutation.removedNodes.length;
		this.#childCount += +isAdded - +isRemoved;
		console.log(this.#childCount);
		const [mayBeSelector, ...mayBeValue] = this.#getSelectorAndValue();

		const isSelector = this.#isSelector(mayBeSelector);

		if (isSelector && this.#property.name === "") {
			this.#property.name = mayBeSelector;
		}

		if (this.#childCount >= 2) {
			this.#example.style[this.#property.name] = mayBeValue.join(" ");
		}

		if (isRemoved && this.#childCount === 1) {
			this.#example.style[this.#property.name] = "";
		}

		if (isSelector === false) {
			this.#property.name = "";
		}
	};
}
class CodeChangeObserver {
	#element;
	#config;
	#observer;

	constructor(element, config, onMutation) {
		this.#element = element;
		this.#config = config;
		this.#observer = new MutationObserver(onMutation);
	}

	observe() {
		this.#observer.observe(this.#element, this.#config);
	}
}
