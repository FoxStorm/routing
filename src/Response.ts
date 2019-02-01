type Send = (body?: any) => Response

export interface Response {
  readonly send: Send

  render (view: string, options?: object, callback?: (err: Error, html: string) => void): void
  render (view: string, callback?: (err: Error, html: string) => void): void
}
