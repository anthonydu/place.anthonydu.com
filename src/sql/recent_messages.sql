create or replace function messages_desc()
returns table(id bigint, sender_name text, body_text text)
language sql
as $$
  select id, sender_name, body_text from messages order by created_at desc;
$$;

select messages_desc();