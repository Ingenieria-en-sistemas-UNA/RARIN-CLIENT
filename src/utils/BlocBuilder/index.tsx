import { Component } from 'react';
import { Observable, Subscription } from "rxjs";
import { ReactNode } from "react";

export enum ConnectionState {
    none,

    waiting,

    active,

    done,

    error,
}

export interface ActiveSnapshot<T> {
    state: ConnectionState.active;
    hasData: Boolean;
    data?: T;
    hasError: boolean;
    error?: string;
}

export interface NoneSnapshot<T> {
    state: ConnectionState.none;
    hasData: Boolean;
    data?: T;
    hasError: boolean;
    error?: string;
}

export interface DoneSnapshot<T> {
    state: ConnectionState.done;
    hasData: Boolean;
    data?: T;
    hasError: boolean;
    error?: string;
}

export interface ErrorSnapshot<T> {
    state: ConnectionState.error;
    hasData: Boolean;
    data?: T;
    hasError: boolean;
    error?: string ;
}

export type Snapshot<T> = ActiveSnapshot<T> | NoneSnapshot<T> | DoneSnapshot<T> | ErrorSnapshot<T>;

export interface StreamBuilderProps<T> {
    // stream is the observable that is subscribed to for changes.
    stream: Observable<T>;

    // builder is a user-supplied render function that takes a stream snapshot
    // and expects react UI to be returned.
    builder: (snapshot: Snapshot<T>) => ReactNode;
}

export interface StreamBuilderState<T> {
    snapshot: Snapshot<T>;
}

export class StreamBuilder<T> extends Component<
    StreamBuilderProps<T>,
    StreamBuilderState<T>
    > {
    private subscription: Subscription;

    constructor(props: StreamBuilderProps<T>) {
        super(props);
        this.state = {
            snapshot: {
                hasData: false,
                hasError: false,
                state: ConnectionState.none,
            },
        };
        this.subscription = Subscription.EMPTY;
    }

    componentDidMount() {
        this.subscription = this.props.stream.subscribe(
            data =>{
                this.setState(({ snapshot }) => ({
                    snapshot: {
                        ...snapshot,
                        hasData: true,
                        hasError: false,
                        error: undefined,
                        data,
                        state: ConnectionState.active,
                    },
                }));
            },
            (error: string) => {
                this.setState(({ snapshot }) => ({
                    snapshot: {
                        ...snapshot,
                        hasError: true,
                        error,
                        state: ConnectionState.error,
                    },
                }));
            },
            () => {

                this.setState(({ snapshot }) => ({
                    snapshot: {
                        ...snapshot,
                        hasData: true,
                        hasError: false,
                        state: ConnectionState.done,
                    },
                }));
            }
        );
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        // Dispatch directly to the user-supplied render function.
        return this.props.builder(this.state.snapshot);
    }
}