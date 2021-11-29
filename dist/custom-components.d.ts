import { Component } from '@loopback/core';
import { PipedriveProducer } from './producers';
import { GistProducer } from './producers/gist.producer';
export declare class CustomComponent implements Component {
    bindings: (import("@loopback/core").Binding<PipedriveProducer> | import("@loopback/core").Binding<GistProducer>)[];
}
