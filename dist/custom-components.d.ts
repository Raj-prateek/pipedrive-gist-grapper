import { Component } from '@loopback/core';
import { GistProducer, PipedriveProducer } from './producers';
import { PipedriveService } from './services';
export declare class CustomComponent implements Component {
    bindings: (import("@loopback/core").Binding<PipedriveProducer> | import("@loopback/core").Binding<GistProducer> | import("@loopback/core").Binding<PipedriveService>)[];
}
