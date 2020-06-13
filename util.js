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
	/*
	 * Toolbar
	 */
	document.querySelector("h1").insertAdjacentHTML(
		"beforebegin",
		`<div id='wm-wiki-toolbar' role='toolbar'>
			<ul class='wm-toolbar' role='toolbar'/>
		</div>`
	);

	const main_toolbar = document.querySelector("#wm-wiki-toolbar > ul");

	function toolbarAppend(html, is_dropdown)
	{
		main_toolbar.insertAdjacentHTML("beforeend", (is_dropdown ? "<li class='wm-dropdown'>" : "<li>") + html + "</li>");
	}

	/*
	 * Navigation menu
	 */

	toolbarAppend(`
		<a id='lisar-nav-menu' class='wm-dropdown-trigger' href='#' role='button'>
			<i class='wm-toolbar-icon fa-map-signs' aria-hidden='true'></i> <span>Jump To</span>
			<i class='wm-toolbar-dropdown-marker' aria-hidden='true'></i>
		</a>
		<ul class='wm-dropdown-menu' role='menu'/>
	`, true);

	const nav_menu = document.querySelector("#lisar-nav-menu + ul");

	// Article labels are always the first <strong> child of <p> directly under #content. This
	// specific distinction is needed to avoid selecting the labels of NN text.
	const article_labels = document.querySelectorAll("#content > p > strong:first-child");

	article_labels.forEach(label => {
		let match = label.textContent.match(/^Article ([0-9]+)\.$/i);

		if (match != null)
		{
			let article_num = match[1];
			label.id = "article" + article_num;

			nav_menu.insertAdjacentHTML("beforeend", `
				<li>
					<a href='#article${article_num}' role='menuitem'>Article ${article_num}</a>
				</li>
			`);
		}
	});

	/*
	 * Non-normative text toggle
	 */

	const nn_display_on = {
		icon:  "wm-toolbar-icon fa-eye",
		label: "Show Non-Normative Text",
	};
	const nn_display_off = {
		icon:  "wm-toolbar-icon fa-eye-slash",
		label: "Hide Non-Normative Text",
	};

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

	toolbarAppend(`
		<a id='lisar-legend-toggle' href='#' role='button'>
			<i class='${nn_display_on.icon}' aria-hidden='true'></i> <span>${nn_display_on.label}</span>
		</a>`
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
