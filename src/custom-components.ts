import {Component, createServiceBinding} from '@loopback/core';
import {GistProducer, PipedriveProducer} from './producers';
import {PipedriveService} from './services';

export class CustomComponent implements Component {
  bindings = [
    createServiceBinding(PipedriveProducer),
    createServiceBinding(GistProducer),
    createServiceBinding(PipedriveService),
  ];
}
