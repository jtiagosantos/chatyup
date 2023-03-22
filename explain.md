```ts
  const channel = supabase.channel('room-65cd79h');


  const { error } = await supabase
    .from('rooms')
    .insert({ name: 'funny-room', user_id: '384806c7-14bb-4261-b310-caaa55cd0854' });

  useEffect(() => {
    const realTimeChanges = supabase
      .channel('room-65cd79h')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'rooms',
          filter: 'user_id=eq.384806c7-14bb-4261-b310-caaa55cd0854',
        },
        (payload) => {
          console.log('Change received!', payload);
        },
      )
      .subscribe();

    return () => {
      realTimeChanges.unsubscribe();
    };
  }, []);
``` 

```ts
  const { data, error } = await supabase.storage
    .from('files')
    .upload(`/avatars/user-ref-${user!.id}.${fileExtension}`, decode(base64), {
      upsert: true,
      contentType: `image/${fileExtension}`,
      cacheControl: '0',
    });

  const data = supabase.storage
    .from('files')
    .getPublicUrl(`/avatars/user-ref-${user!.id}.${fileExtension}`);
```