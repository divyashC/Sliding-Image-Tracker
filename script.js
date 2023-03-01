const track = document.getElementById("img-group");

// function to handle the mouse wheel event and touch event that changes the image position
const handleOnWheel = (e) => {
	const deltaX = e.deltaX;
	const deltaY = e.deltaY;
	const deltaMax = window.innerWidth / 2;

	let percentage =
		(deltaX / deltaMax) * 100 + (deltaY > 0 ? 5 : deltaY < 0 ? -5 : 0);

	const nextUnconstrainedPercentage =
		parseFloat(track.dataset.percentage || 0) + percentage;
	const nextPercentage = Math.min(
		Math.max(nextUnconstrainedPercentage, -100),
		0
	);

	track.dataset.percentage = nextPercentage;

	track.animate(
		{
			transform: `translate(${nextPercentage}%, -50%)`,
		},
		{ duration: 1200, fill: "forwards" }
	);

	for (const image of track.getElementsByClassName("images")) {
		image.animate(
			{
				objectPosition: `${100 + nextPercentage}% center`,
			},
			{ duration: 1200, fill: "forwards" }
		);
	}
};

// event listeners for mouse wheel and touch events
window.addEventListener("wheel", handleOnWheel, { passive: true });

window.addEventListener("touchstart", (e) => {
	track.dataset.mouseDownAt = e.touches[0].clientX;
});

window.addEventListener("touchend", (e) => {
	track.dataset.mouseDownAt = "0";
	track.dataset.prevPercentage = track.dataset.percentage;
});

window.addEventListener("touchmove", (e) => {
	if (track.dataset.mouseDownAt === "0") return;

	const deltaMouse =
		parseFloat(track.dataset.mouseDownAt) - e.touches[0].clientX;
	const deltaMax = window.innerWidth / 2;

	const percentage = (deltaMouse / deltaMax) * -100;
	const nextUnconstrainedPercentage =
		parseFloat(track.dataset.prevPercentage || 0) + percentage;
	const nextPercentage = Math.max(
		Math.min(nextUnconstrainedPercentage, 0),
		-100
	);

	track.dataset.percentage = nextPercentage;

	track.animate(
		{
			transform: `translate(${nextPercentage}%, -50%)`,
		},
		{ duration: 1200, fill: "forwards" }
	);

	for (const image of track.getElementsByClassName("images")) {
		image.animate(
			{
				objectPosition: `${100 + nextPercentage}% center`,
			},
			{ duration: 1200, fill: "forwards" }
		);
	}
});
