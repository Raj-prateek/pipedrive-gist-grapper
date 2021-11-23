.PHONY: init-dev
init-dev:
	$(MAKE) build-dev
	$(MAKE) install-all-packages
	docker-compose up -d

.PHONY: build-dev
build-dev:
	docker-compose build --build-arg DOCKER_UID=$(shell id -u) --compress --no-cache --build-arg NODE_ENV=development

.PHONY: ci
install-all-packages:
	$(MAKE) install-all-packages
	npm run test

.PHONY: install-all-packages
install-all-packages:
	npm ci
