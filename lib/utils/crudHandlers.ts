import { NextResponse } from 'next/server';

// Generic bulk delete handler
export async function handleBulkDelete({ model, ids, perItemCleanup }: {
  model: any,
  ids: string[],
  perItemCleanup?: (item: any) => Promise<void>
}) {
  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ success: false, message: 'No IDs provided.' }, { status: 400 });
  }
  const items = await model.find({ _id: { $in: ids } });
  if (perItemCleanup) {
    for (const item of items) {
      await perItemCleanup(item);
    }
  }
  await model.deleteMany({ _id: { $in: ids } });
  return NextResponse.json({ success: true, message: 'Items deleted.' }, { status: 200 });
}

// Generic GET all handler
export async function handleGetAll({ model, sort = {}, query = {} }: {
  model: any,
  sort?: any,
  query?: any
}) {
  try {
    const items = await model.find(query).sort(sort);
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

// Generic POST handler
export async function handlePost({ model, data, preSave }: {
  model: any,
  data: any,
  preSave?: (data: any) => Promise<any>
}) {
  try {
    let toSave = data;
    if (preSave) toSave = await preSave(data);
    const item = await model.create(toSave);
    return NextResponse.json(item, { status: 201 });
  } catch (error: any) {
    console.error('Create item error:', error);
    
    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0];
      return NextResponse.json({ 
        error: `${field.toLocaleUpperCase()} already exists. Please use a different ${field}.` 
      }, { status: 400 });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json({ 
        error: `Validation failed: ${validationErrors.join(', ')}` 
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      error: error.message || 'Failed to create item' 
    }, { status: 500 });
  }
}

// Generic PATCH/PUT handler
export async function handlePatchOrPut({ model, id, data, preUpdate }: {
  model: any,
  id: string,
  data: any,
  preUpdate?: (data: any) => Promise<any>
}) {
  try {
    let toUpdate = data;
    if (preUpdate) toUpdate = await preUpdate(data);
    const item = await model.findByIdAndUpdate(id, toUpdate, { new: true });
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

// Generic paginated GET handler
export async function handleGetPaginated({ model, sort = {}, query = {}, page = 1, limit = 10, search = '', searchFields = [] }: {
  model: any,
  sort?: any,
  query?: any,
  page?: number,
  limit?: number,
  search?: string,
  searchFields?: string[],
}) {
  try {
    const skip = (page - 1) * limit;
    let finalQuery = { ...query };
    if (search && searchFields.length > 0) {
      finalQuery.$or = searchFields.map(field => ({
        [field]: { $regex: search, $options: 'i' }
      }));
    }
    const [total, data] = await Promise.all([
      model.countDocuments(finalQuery),
      model.find(finalQuery).sort(sort).skip(skip).limit(limit)
    ]);
    const pages = Math.ceil(total / limit);
    return NextResponse.json({
      data,
      meta: { total, page, pages, limit }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
} 