/*
 * Copyright (C) 2020 by Iris Morelle <shadowm@wesnoth.org>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function() {
	const nn_display_on = {
		icon:  "wm-toolbar-icon fa-eye",
		label: "Show Non-Normative Text",
	};
	const nn_display_off = {
		icon:  "wm-toolbar-icon fa-eye-slash",
		label: "Hide Non-Normative Text",
	}

	const legend_blocks = document.querySelectorAll("blockquote");
	let legend_on = false;

	legend_blocks.forEach(legend => {
		legend.classList.add("lisar-legend");
		legend.addEventListener("transitionend", () => {
			legend.classList.remove("lisar-legend-slidein", "lisar-legend-slideout");
			if (!legend_on)
			{
				legend.classList.remove("lisar-legend-visible");
				legend.style.opacity = "";
			}
		})
	});

	document.querySelector("h1").insertAdjacentHTML(
		"beforebegin",
		`<div id='wm-wiki-toolbar' role='toolbar'><ul class='wm-toolbar' role='toolbar'><li>
			<a id='lisar-legend-toggle' href='#' role='button'>
				<i class='${nn_display_on.icon}' aria-hidden='true'></i> <span>${nn_display_on.label}</span>
			</a>
		</li></ul></div>`
	);

	const toggle_button = document.querySelector("#lisar-legend-toggle");

	toggle_button.addEventListener("click", () => {
		legend_on = !legend_on;
		const { label, icon } = legend_on ? nn_display_off : nn_display_on;
		toggle_button.querySelector("span").textContent = label;
		toggle_button.querySelector("i").className = icon;

		legend_blocks.forEach(legend => {
			// Hiding
			if (!legend_on)
			{
				legend.style.opacity = 0;
				legend.classList.add("lisar-legend-slideout");
			}
			// Unhiding
			else
			{
				legend.classList.add("lisar-legend-visible", "lisar-legend-slidein");
				legend.style.opacity = 0;
				window.setTimeout(function() { legend.style.opacity = 1; }, 1);
			}
		});

		event.preventDefault();
	});
})();
