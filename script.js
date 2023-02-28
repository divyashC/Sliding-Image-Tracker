const track = document.getElementById("gallery");

const handleOnWheel = (e) => {
	const deltaX = e.deltaX;
	const deltaY = e.deltaY;
	const maxDelta = window.innerWidth / 2;

	let percentage = (deltaX / maxDelta) * 100;
	if (deltaY > 0) {
		percentage += 5;
	} else if (deltaY < 0) {
		percentage -= 5;
	}

	const nextPercentageUnconstrained =
		parseFloat(track.dataset.percentage || 0) + percentage;
	const nextPercentage = Math.min(
		Math.max(nextPercentageUnconstrained, -100),
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

window.addEventListener("wheel", handleOnWheel, { passive: true });

window.addEventListener(
	"touchstart",
	(e) => {
		track.dataset.mouseDownAt = e.touches[0].clientX;
	},
	{ passive: true }
);

window.addEventListener(
	"touchend",
	(e) => {
		track.dataset.mouseDownAt = "0";
		track.dataset.prevPercentage = track.dataset.percentage;
	},
	{ passive: true }
);

window.addEventListener(
	"touchmove",
	(e) => {
		if (track.dataset.mouseDownAt === "0") return;

		const mouseDelta =
			parseFloat(track.dataset.mouseDownAt) - e.touches[0].clientX;
		const maxDelta = window.innerWidth / 2;

		const percentage = (mouseDelta / maxDelta) * -100;
		const nextPercentageUnconstrained =
			parseFloat(track.dataset.prevPercentage || 0) + percentage;
		const nextPercentage = Math.max(
			Math.min(nextPercentageUnconstrained, 0),
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
	},
	{ passive: true }
);
