.PHONY: init-dev
init-dev:
	$(MAKE) build-dev
	$(MAKE) install-all-packages
	docker-compose up -d

.PHONY: build-dev
build-dev:
	docker-compose build --build-arg DOCKER_UID=$(shell id -u) --compress --no-cache --build-arg NODE_ENV=development

.PHONY: ci
ci:
	$(MAKE) install-all-packages
	$(MAKE) test
	$(MAKE) lint

.PHONY: install-all-packages
install-all-packages:
	npm ci

.PHONY: test
test:
	npm run test

.PHONY: lint
lint:
	npm run lint
