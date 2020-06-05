#
# Builds the static page containing the Wesnoth Constitution
#
# Copyright (C) 2020 by Iris Morelle <shadowm@wesnoth.org>
#

WESMERE_BUILD			:= ./wesmere-build
WESMERE_PATH			:= $(realpath ..)/wesmere

TARGETS = Project-Constitution.html

all: $(TARGETS)

%.html: %.md
	@echo "  LISAR       $@"
	@$(WESMERE_BUILD) $(WESMERE_PATH) $< > $@.new && mv -f $@.new $@

clean:
	rm -f *.html *.html.new
