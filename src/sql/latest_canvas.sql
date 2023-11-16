create or replace function latest_canvas()
returns table(x smallint, y smallint, color integer)
language sql
as $$
  select distinct on (x, y) x, y, color from canvas order by x, y, created_at desc;
$$;

select latest_canvas();