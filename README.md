Wesnoth Constitution
====================

This repository contains the authoritative version of the Battle for Wesnoth Project Constitution, along with the scripts and resources used to generate the [HTML version](https://www.wesnoth.org/constitution/) of it found in the Wesnoth.org website.

The current version of the Project Constitution was approved in [June 2022](https://r.wesnoth.org/t55791) and came into effect in [February 2023](https://r.wesnoth.org/t56666). The proposal of changes to the Constitution itself is regulated by Chapter IV. Pull requests containing changes to the `Project-Constitution.md` document itself or altering any parts of the authoritative text portions of the HTML output will be rejected.


Build Requirements
------------------

* Wesmere <https://github.com/wesnoth/wesmere> and its requirements
* Python >= 3.5.0              (`python3`)
* libXSLT processor            (`xsltproc`)

The Wesmere sources are assumed to be located in `../wesmere` by default. The exact path may be overridden with the `WESMERE_PATH` Makefile variable.
