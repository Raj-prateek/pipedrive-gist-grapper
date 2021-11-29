import {Component, createServiceBinding} from '@loopback/core';
import {PipedriveProducer} from './producers';
import {GistProducer} from './producers/gist.producer';

export class CustomComponent implements Component {
  bindings = [
    createServiceBinding(PipedriveProducer),
    createServiceBinding(GistProducer),
  ];
}
