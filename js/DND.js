const draggables = [];

const dropzones = [];

document.querySelectorAll(".draggable").forEach((el, index) => {
	const dataType = el.attributes["data-type"].value;

	if (!dataType) {
		throw new Error("Draggable element doesn't have data-type attribute");
	}

	draggables.push(new Draggable(el, dataType, index));
});

document.querySelectorAll(".dropzone").forEach((el) => {
	const dataType = el.attributes["data-type"].value;

	if (!dataType) {
		throw new Error("Dropzone doesn't have attribute data-type");
	}

	dropzones.push(
		new Dropzone(el, dataType, (id) => draggables[id], {
			onDrop(dropzone, draggable) {
				const dataType = dropzone.element.attributes["data-type"].value;
				if (dataType === "all") {
					draggable.element.classList.add("words__word");
				} else {
					draggable.element.classList.remove("words__word");
				}
			},
		})
	);
});

dropzones.forEach((el) => el.subscribe());
draggables.forEach((el) => el.subscribe());

const codeDropzones = [];

document.querySelectorAll(".code-sandbox__code").forEach((el) => {
	const data = el.attributes["data-example"].value;

	if (!data) {
		throw new Error("Dropzone doesn't have attribute data-type");
	}

	const example = document.querySelector(`[data-name=${data}]`);
	codeDropzones.push(new CodeChange(el, example));
});
