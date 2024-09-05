def is_following(api: object, id_1: int, id_2: int) -> bool:
    result = api.get_friendship(source_id=id_1, target_id=id_2)[0]  # type: ignore
    return result.following
