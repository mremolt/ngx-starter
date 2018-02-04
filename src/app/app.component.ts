import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

const worker = require('workerize-loader!./sample.worker');

let instance = worker(); // `new` is optional

instance.expensiveFoo().then((count: number) => {
  console.log('success', count);
});

instance
  .expensive(10000, {
    foo: 42,
    bar: new Date(),
    baz: new Map(),
    ggg: new Set(),
  })
  .then((count: number) => {
    console.log('success2', count);
  });

@Component({
  selector: 'dcs-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public who: string = 'stranger';

  public ngOnInit(): void {
    console.log(`App booted in ${performance.now().toFixed(2)} ms !`);

    setTimeout(() => {
      this.who = 'world';
      import('./foo').then(module => {
        console.log(module.foo());
      });
    }, 1000);
  }
}
