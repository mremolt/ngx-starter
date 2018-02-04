import { Subject } from 'rxjs/Subject';

export async function expensiveFoo() {
  await new Promise(resolve => setTimeout(resolve, 5000));
  return 42;
}

export function expensive(time: number, data: any) {
  let start = Date.now(),
    count = 0;
  while (Date.now() - start < time) count++;
  console.log(
    'ffffffffff',
    data,
    data.bar,
    (<Date>data.bar).getMinutes(),
    new Subject()
  );
  const s: Set<any> = data.ggg;

  console.log(s);
  s.add(12);
  s.add(3);
  s.add(8);
  s.add(12);

  data.baz.set('count', count);
  return data;
}
