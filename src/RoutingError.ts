import { Debuggable } from 'foxstorm-debuggable'

// Errors that can be thrown while working with Routing.
export class RoutingError extends Debuggable {
  static readonly readableName = 'Routing Error'

  readonly identifier!: string

  readonly reason!: string

  constructor (
      identifier: string,
      reason: string
  ) {
    super(reason)
    this.identifier = identifier
    this.reason = reason
  }
}
